import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, UserProfile, ApiResponse, PaginatedResponse, PaginationParams } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  getProfile(): Observable<UserProfile> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.apiUrl}/users/profile`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Mettre à jour le profil utilisateur
   */
  updateProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<ApiResponse<UserProfile>>(`${this.apiUrl}/users/profile`, profileData)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Obtenir un utilisateur par ID
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/${userId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Obtenir la liste des utilisateurs (pour admin)
   */
  getUsers(params?: PaginationParams): Observable<PaginatedResponse<User>> {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
      if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
      if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    return this.http.get<PaginatedResponse<User>>(`${this.apiUrl}/users`, { params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /**
   * Supprimer le compte utilisateur
   */
  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/profile`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Changer le mot de passe
   */
  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    const passwordData = { currentPassword, newPassword };
    return this.http.post<void>(`${this.apiUrl}/users/change-password`, passwordData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Télécharger l'avatar
   */
  uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return this.http.post<ApiResponse<{ avatarUrl: string }>>(`${this.apiUrl}/users/avatar`, formData)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  /**
   * Rechercher des utilisateurs
   */
  searchUsers(query: string): Observable<User[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users/search`, { params })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('User Service Error:', error);
    return throwError(() => error);
  }
}