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
      // Initialize infoVisible array with false values for each book
      this.infoVisible = Array(this.books.length).fill(false);
    });
  }

  showMoreInfo(index: number): void {
    // Toggle the visibility of additional information for the selected book
    this.infoVisible[index] = !this.infoVisible[index];
    // If the info is visible, set the selected book index
    if (this.infoVisible[index]) {
      this.selectedBookIndex = index;
    } else {
      this.selectedBookIndex = null;
    }
  }
}

