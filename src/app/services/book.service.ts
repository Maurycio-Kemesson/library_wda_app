import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { PaginatedResult } from '../models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseURL = `${environment.mainUrlAPI}book`;

  constructor(private http: HttpClient) { }

  getAll(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Book[]>> {

    const paginatedResult: PaginatedResult<Book[]> = new PaginatedResult<Book[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Book[]>(this.baseURL, { observe: 'response', params })
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseURL}/${id}`);
  }

  getByDisciplinaId(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseURL}/ByDisciplina/${id}`);
  }

  post(book: Book) {
    return this.http.post(this.baseURL, book);
  }

  put(book: Book) {
    return this.http.put(`${this.baseURL}/${book.id}`, book);
  }

  patch(book: Book) {
    return this.http.patch(`${this.baseURL}/${book.id}`, book);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
