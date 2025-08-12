import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:3001/api/tipo_vehiculo';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ type: string }[]> {
    return this.http.get<{ type: string }[]>(this.apiUrl);
  }

  addCategory(category: { type: string }): Observable<{ type: string }> {
    return this.http.post<{ type: string }>(this.apiUrl, category);
  }

  updateCategory(
    categoryId: string,
    category: { type: string }
  ): Observable<{ type: string }> {
    return this.http.put<{ type: string }>(
      `${this.apiUrl}/${categoryId}`,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }
}
