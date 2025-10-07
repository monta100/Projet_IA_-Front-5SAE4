import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private userKey = 'current_user';

  constructor(private http: HttpClient) {
    // Vérifier si un utilisateur existe au démarrage
    this.checkStoredUser();
  }

  private checkStoredUser(): void {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        localStorage.removeItem(this.userKey);
      }
    }
  }

  /**
   * Connexion utilisateur (correspond à votre endpoint POST /api/users/login)
   */
  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, credentials)
      .pipe(
        tap(user => {
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Inscription utilisateur (correspond à votre endpoint POST /api/users/register)
   */
  register(userData: RegisterRequest): Observable<User> {
    // Définir le rôle par défaut si non spécifié
    const registerData = {
      ...userData,
      role: userData.role || 'Adherent'
    };
    
    return this.http.post<User>(`${this.apiUrl}/users/register`, registerData)
      .pipe(
        tap(user => {
          // Après inscription, stocker l'utilisateur
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Déconnexion
   */
  logout(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Mot de passe oublié (correspond à votre endpoint POST /api/users/forgot-password)
   */
  forgotPassword(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}/users/forgot-password`, null, { 
      params, 
      responseType: 'text' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Réinitialiser le mot de passe (correspond à votre endpoint POST /api/users/reset-password)
   */
  resetPassword(token: string, nouveauMotDePasse: string): Observable<string> {
    const params = new HttpParams()
      .set('token', token)
      .set('nouveauMotDePasse', nouveauMotDePasse);
    
    return this.http.post(`${this.apiUrl}/users/reset-password`, null, { 
      params, 
      responseType: 'text' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Confirmer l'email (correspond à votre endpoint GET /api/users/confirm)
   */
  confirmEmail(token: string): Observable<string> {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.apiUrl}/users/confirm`, { 
      params, 
      responseType: 'text' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifier si l'utilisateur a confirmé son email
   */
  isEmailConfirmed(): boolean {
    const user = this.getCurrentUser();
    return user ? user.enabled : false;
  }

  /**
   * Obtenir le nom complet de l'utilisateur
   */
  getUserDisplayName(): string {
    const user = this.getCurrentUser();
    if (!user) return '';
    
    return `${user.prenom} ${user.nom}`;
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth Service Error:', error);
    console.error('Error details:', {
      status: error.status,
      statusText: error.statusText,
      errorBody: error.error,
      url: error.url,
      headers: error.headers
    });
    
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.status === 400) {
      errorMessage = 'Données invalides. Vérifiez les informations saisies.';
    }
    
    return throwError(() => ({ ...error, userMessage: errorMessage }));
  }
}