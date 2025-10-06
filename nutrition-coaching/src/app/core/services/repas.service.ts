import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Repas } from '../models/repas.model';
import { API_BASE_URL } from './api-config';

@Injectable({ providedIn: 'root' })
export class RepasService {
  private readonly url = `${API_BASE_URL}/repas`;
  constructor(private http: HttpClient) {}

  private mapRepas(dto: any): Repas {
    // Supporte champs snake_case venant du backend
    return new Repas(
      dto.type,
      dto.date,
      dto.nom ?? dto.name ?? '',
      dto.caloriesTotales ?? dto.calories_totales ?? dto.calories ?? 0,
      dto.id,
      dto.user,
      dto.recettes,
      dto.ingredients,
    );
  }

  findAll(): Observable<Repas[]> { 
    console.log('[REPAS SERVICE] GET', this.url);
    return this.http.get<any[]>(this.url).pipe(map(list => list.map(d => this.mapRepas(d)))); 
  }
  findById(id: number | string): Observable<Repas> { 
    return this.http.get<any>(`${this.url}/${id}`).pipe(map(d => this.mapRepas(d))); 
  }
  create(r: Omit<Repas,'id'>): Observable<Repas> { 
    return this.http.post<any>(this.url, r).pipe(map(d => this.mapRepas(d))); 
  }
  update(id: number | string, r: Partial<Repas>): Observable<Repas> { 
    return this.http.put<any>(`${this.url}/${id}`, r).pipe(map(d => this.mapRepas(d))); 
  }
  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
