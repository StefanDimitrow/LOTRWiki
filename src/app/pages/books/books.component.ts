import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/service/api-dataservice/api-interface';
import { DataService } from 'src/app/service/api-dataservice/dataservice.service';
import { ErrorHandlerService } from '../../service/error-handling/errorhandling.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBookIndex: number | null = null;
  infoVisible: boolean[] = [];
  errorMessage: string = '';

  constructor(
    private dataService: DataService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.dataService.getBooks().subscribe(
      (response) => {
        this.books = Object.values(response);
        this.infoVisible = Array(this.books.length).fill(false);
      },
      (error) => {
        this.handleError('Error fetching books: ' + error.message);
      }
    );
  }

  showMoreInfo(index: number): void {
    this.infoVisible[index] = !this.infoVisible[index];

    if (this.infoVisible[index]) {
      this.selectedBookIndex = index;
    } else {
      this.selectedBookIndex = null;
    }
  }

  handleError(message: string): void {
    this.errorMessage = message;
    this.errorHandlerService.handleError(message);
  }
}
