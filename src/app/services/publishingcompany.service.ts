import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publishingcompany } from '../models/Publishingcompany';


@Injectable({
  providedIn: 'root'
})
export class PublishingcompanyService {

  baseURL = `${environment.mainUrlAPI}professor`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Publishingcompany[]> {
    return this.http.get<Publishingcompany[]>(this.baseURL);
  }

  getById(id: number): Observable<Publishingcompany> {
    return this.http.get<Publishingcompany>(`${this.baseURL}/${id}`);
  }

  getByAlunoId(id: number): Observable<Publishingcompany[]> {
    return this.http.get<Publishingcompany[]>(`${this.baseURL}/ByAluno/${id}`);
  }

  post(publishingcompany: Publishingcompany) {
    return this.http.post(this.baseURL, Publishingcompany);
  }

  put(publishingcompany: Publishingcompany) {
    return this.http.put(`${this.baseURL}/${publishingcompany.id}`, Publishingcompany);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }


}
