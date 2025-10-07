import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  NutritionPlan, 
  NutritionTracker, 
  Meal, 
  Food, 
  ApiResponse, 
  PaginatedResponse, 
  PaginationParams 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // === Plans nutritionnels ===

  /**
   * Obtenir tous les plans nutritionnels de l'utilisateur
   */
  getNutritionPlans(params?: PaginationParams): Observable<PaginatedResponse<NutritionPlan>> {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
      if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
      if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    return this.http.get<PaginatedResponse<NutritionPlan>>(`${this.apiUrl}/nutrition/plans`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtenir un plan nutritionnel par ID
   */
  getNutritionPlan(planId: string): Observable<NutritionPlan> {
    return this.http.get<ApiResponse<NutritionPlan>>(`${this.apiUrl}/nutrition/plans/${planId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Créer un nouveau plan nutritionnel
   */
  createNutritionPlan(plan: Omit<NutritionPlan, 'id' | 'createdAt' | 'updatedAt'>): Observable<NutritionPlan> {
    return this.http.post<ApiResponse<NutritionPlan>>(`${this.apiUrl}/nutrition/plans`, plan)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Mettre à jour un plan nutritionnel
   */
  updateNutritionPlan(planId: string, plan: Partial<NutritionPlan>): Observable<NutritionPlan> {
    return this.http.put<ApiResponse<NutritionPlan>>(`${this.apiUrl}/nutrition/plans/${planId}`, plan)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Supprimer un plan nutritionnel
   */
  deleteNutritionPlan(planId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/nutrition/plans/${planId}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Activer/désactiver un plan nutritionnel
   */
  togglePlanStatus(planId: string, isActive: boolean): Observable<NutritionPlan> {
    return this.http.patch<ApiResponse<NutritionPlan>>(`${this.apiUrl}/nutrition/plans/${planId}/status`, { isActive })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // === Suivi nutritionnel ===

  /**
   * Obtenir le suivi nutritionnel pour une date
   */
  getNutritionTracker(date: string): Observable<NutritionTracker> {
    const params = new HttpParams().set('date', date);
    return this.http.get<ApiResponse<NutritionTracker>>(`${this.apiUrl}/nutrition/tracker`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Mettre à jour le suivi nutritionnel
   */
  updateNutritionTracker(tracker: Partial<NutritionTracker>): Observable<NutritionTracker> {
    return this.http.post<ApiResponse<NutritionTracker>>(`${this.apiUrl}/nutrition/tracker`, tracker)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Obtenir l'historique du suivi nutritionnel
   */
  getNutritionHistory(startDate: string, endDate: string): Observable<NutritionTracker[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<ApiResponse<NutritionTracker[]>>(`${this.apiUrl}/nutrition/history`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // === Aliments ===

  /**
   * Rechercher des aliments
   */
  searchFoods(query: string): Observable<Food[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ApiResponse<Food[]>>(`${this.apiUrl}/nutrition/foods/search`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Obtenir les détails d'un aliment
   */
  getFoodDetails(foodId: string): Observable<Food> {
    return this.http.get<ApiResponse<Food>>(`${this.apiUrl}/nutrition/foods/${foodId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Ajouter un aliment personnalisé
   */
  createCustomFood(food: Omit<Food, 'id'>): Observable<Food> {
    return this.http.post<ApiResponse<Food>>(`${this.apiUrl}/nutrition/foods`, food)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  // === Repas ===

  /**
   * Ajouter un repas au suivi
   */
  addMealToTracker(date: string, meal: Meal): Observable<NutritionTracker> {
    const data = { date, meal };
    return this.http.post<ApiResponse<NutritionTracker>>(`${this.apiUrl}/nutrition/tracker/meals`, data)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Supprimer un repas du suivi
   */
  removeMealFromTracker(trackerId: string, mealId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/nutrition/tracker/${trackerId}/meals/${mealId}`)
      .pipe(catchError(this.handleError));
  }

  // === Statistiques ===

  /**
   * Obtenir les statistiques nutritionnelles
   */
  getNutritionStats(period: 'week' | 'month' | 'year'): Observable<any> {
    const params = new HttpParams().set('period', period);
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/nutrition/stats`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Calculer les besoins caloriques recommandés
   */
  calculateRecommendedCalories(data: {
    age: number;
    gender: 'male' | 'female';
    height: number;
    weight: number;
    activityLevel: string;
    goal: 'lose' | 'maintain' | 'gain';
  }): Observable<{ calories: number; macros: any }> {
    return this.http.post<ApiResponse<{ calories: number; macros: any }>>(`${this.apiUrl}/nutrition/calculate`, data)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Nutrition Service Error:', error);
    return throwError(() => error);
  }
}