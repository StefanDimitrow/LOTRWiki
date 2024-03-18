import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facts } from './facts-interface';

@Injectable({
  providedIn: 'root'
})
export class FactsDatabaseService {
  constructor(private http: HttpClient) { }

  getFacts(): Observable<Facts[]> {
    return this.http.get<Facts[]>('https://lotrwiki-angular-default-rtdb.firebaseio.com/facts.json');
  }
}

