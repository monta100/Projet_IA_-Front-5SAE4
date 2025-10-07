import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url = `${environment.apiBaseUrl}/users`;
  constructor(private http: HttpClient) {}

  findAll(params?: Record<string, any>): Observable<User[]> {
    return this.http.get<User[]>(this.url, { params });
  }
  findById(id: number | string): Observable<User> { return this.http.get<User>(`${this.url}/${id}`); }
  create(user: Omit<User, 'id'>): Observable<User> { return this.http.post<User>(this.url, user); }
  update(id: number | string, user: Partial<User>): Observable<User> { return this.http.put<User>(`${this.url}/${id}`, user); }
  patch(id: number | string, user: Partial<User>): Observable<User> { return this.http.patch<User>(`${this.url}/${id}`, user); }
  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
