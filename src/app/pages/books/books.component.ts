import { Component, OnInit } from '@angular/core';
import { Characters } from 'src/app/service/api-dataservice/dataservice-interface';
import { LotrapiDataserviceService } from 'src/app/service/api-dataservice/lotrapi-dataservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  characters: Characters[] =[];


  constructor(private dataService: LotrapiDataserviceService) {}
  ngOnInit(): void {
    this.dataService.getBooks().subscribe((data) => {
      this.books = data.results;
      

    });
  }
}
