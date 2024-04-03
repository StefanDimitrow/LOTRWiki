import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/service/api-dataservice/api-interface';
import { DataService } from 'src/app/service/api-dataservice/dataservice.service';
import { ErrorHandlerService } from '../../service/error-handling/errorhandling.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  hobbitFilms: Film[] = [];
  selectedFilmIndex: number | null = null;
  infoVisible: boolean[] = [];
  hobbitInfoVisible: boolean[] = [];
  errorMessage: string = '';

  constructor(
    private dataService: DataService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.getFilms();
    this.getHobbitFilms();
  }

  getFilms(): void {
    this.dataService.getLotrFilms().subscribe(
      (response) => {
        this.films = Object.values(response);
        this.infoVisible = Array(this.films.length).fill(false);
      },
      (error) => {
        this.handleError(
          'Error fetching Lord of the Rings films: ' + error.message
        );
      }
    );
  }

  getHobbitFilms(): void {
    this.dataService.getHobbitFilms().subscribe(
      (hobbitResponse) => {
        this.hobbitFilms = Object.values(hobbitResponse);
        this.hobbitInfoVisible = Array(this.hobbitFilms.length).fill(false);
      },
      (error) => {
        this.handleError('Error fetching Hobbit films: ' + error.message);
      }
    );
  }

  showMoreInfo(index: number): void {
    this.infoVisible[index] = !this.infoVisible[index];
    if (this.infoVisible[index]) {
      this.selectedFilmIndex = index;
    } else {
      this.selectedFilmIndex = null;
    }
  }

  showMoreHobbitInfo(index: number): void {
    this.hobbitInfoVisible[index] = !this.hobbitInfoVisible[index];
    if (this.hobbitInfoVisible[index]) {
      this.selectedFilmIndex = index;
    } else {
      this.selectedFilmIndex = null;
    }
  }

  handleError(message: string): void {
    this.errorMessage = message;
    this.errorHandlerService.handleError(message);
  }
}
