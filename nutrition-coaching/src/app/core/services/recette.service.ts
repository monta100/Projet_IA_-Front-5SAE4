import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette } from '../models/recette.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecetteService {
  // Le controller Spring est mappé sur @RequestMapping("/recette") (singulier)
  private readonly url = `${environment.apiBaseUrl}/recette`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<Recette[]> { return this.http.get<Recette[]>(this.url); }
  findById(id: number | string): Observable<Recette> { return this.http.get<Recette>(`${this.url}/${id}`); }
  create(r: Omit<Recette,'id'>): Observable<Recette> { return this.http.post<Recette>(this.url, r); }
  update(id: number | string, r: Partial<Recette>): Observable<Recette> { return this.http.put<Recette>(`${this.url}/${id}`, r); }
  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
