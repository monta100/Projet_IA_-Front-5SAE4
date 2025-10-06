import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { API_BASE_URL } from './api-config';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  // Controller Spring: @RequestMapping("/ingredient") (singulier)
  private readonly url = `${API_BASE_URL}/ingredient`;
  constructor(private http: HttpClient) {}

  findAll(): Observable<Ingredient[]> { return this.http.get<Ingredient[]>(this.url); }
  findById(id: number | string): Observable<Ingredient> { return this.http.get<Ingredient>(`${this.url}/${id}`); }
  create(r: Omit<Ingredient,'id'>): Observable<Ingredient> { return this.http.post<Ingredient>(this.url, r); }
  update(id: number | string, r: Partial<Ingredient>): Observable<Ingredient> { return this.http.put<Ingredient>(`${this.url}/${id}`, r); }
  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
