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
  selectedFilmIndex: number | null = null;
  infoVisible: boolean[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getLotrFilms();
  }

  getLotrFilms(): void {
    this.dataService.getLotrFilms().subscribe((response) => {
      this.films = Object.values(response);

      this.infoVisible = Array(this.films.length).fill(false);
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
}

