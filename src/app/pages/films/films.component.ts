import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, } from './films-interface';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFilms();
  }
  
  getFilms() {
    this.http.get<ApiResponse>('https://lotrapi.co/api/v1/films').subscribe((data: ApiResponse) => {
      this.films = data.results;
    });
  }
}