import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './dataservice-interface';



@Injectable({
  providedIn: 'root'
})
export class LotrapiDataserviceService {
  
  constructor(private http:HttpClient){}
  

  getBooks(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://lotrapi.co/api/v1/books')
  }
  getFilms(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>('https://lotrapi.co/api/v1/films')
  }
  getCharacters() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>('https://lotrapi.co/api/v1/characters')
  }
}
