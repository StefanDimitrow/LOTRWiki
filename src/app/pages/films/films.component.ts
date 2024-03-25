import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/service/api-dataservice/api-interface';
import { DataService } from 'src/app/service/api-dataservice/dataservice.service';

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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getFilms();
    this.getHobbitFilms(); 
  }

  getFilms(): void {
    this.dataService.getLotrFilms().subscribe((response) => {
      this.films = Object.values(response);
      this.infoVisible = Array(this.films.length).fill(false);
    });
  }

  getHobbitFilms(): void {
    this.dataService.getHobbitFilms().subscribe((hobbitResponse) => {
      console.log("Hobbit Films Response:", hobbitResponse); // Add this line
      this.hobbitFilms = Object.values(hobbitResponse);
      this.hobbitInfoVisible = Array(this.hobbitFilms.length).fill(false);
    });
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
  
  }
