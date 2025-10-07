import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendTestService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Test de connexion au backend Spring Boot
   */
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }

  /**
   * Test des endpoints d'authentification
   */
  testAuthEndpoints(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/test`);
  }

  /**
   * Obtenir les informations du serveur
   */
  getServerInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/info`);
  }
}