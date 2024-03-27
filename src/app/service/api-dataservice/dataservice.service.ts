import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://lotrwiki-angular-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}books.json`);
  }
  getLotrFilms(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}films/lotr.json`)
  }
  getHobbitFilms(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}films/hobbit.json`)
  }
  getCharacters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}characters.json`);
  }
}