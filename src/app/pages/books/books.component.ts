import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/service/api-dataservice/api-interface';
import { DataService } from 'src/app/service/api-dataservice/dataservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  selectedBookIndex: number | null = null;
  infoVisible: boolean[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.dataService.getBooks().subscribe((response) => {
      this.books = Object.values(response);
      this.infoVisible = Array(this.books.length).fill(false);
    });
  }

  showMoreInfo(index: number): void {
    this.infoVisible[index] = !this.infoVisible[index];

    if (this.infoVisible[index]) {
      this.selectedBookIndex = index;
    } else {
      this.selectedBookIndex = null;
    }
  }
}
