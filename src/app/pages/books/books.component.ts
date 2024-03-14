import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from './books-interface';
import { Character } from './characters';
import { Observable, forkJoin } from 'rxjs';

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
      console.log(data);
      this.books = data.results;
      this.fetchCharacters(); // Call fetchCharacters after fetching the books
    });
  }

  public fetchCharacters() {
    const characterObservables: Observable<Character>[] = [];
    this.books.forEach(book => {
      book.characters.forEach((characterUrl: string) => {
        characterObservables.push(this.http.get<Character>(characterUrl));
      });
    });

    forkJoin(characterObservables).subscribe(characters => {
      let index = 0;
      this.books.forEach(book => {
        const numCharacters = book.characters.length;
        book.characters = characters.slice(index, index + numCharacters);
        index += numCharacters;
      });
    });
  }
}