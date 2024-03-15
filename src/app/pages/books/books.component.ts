import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from './books-interface';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks() {
    this.http.get<any>('https://lotrapi.co/api/v1/books').subscribe((data: ApiResponse) => {
      this.books = data.results;
      
    });
  }


}