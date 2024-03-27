import { Component, OnInit } from '@angular/core';
import { Characters } from 'src/app/service/api-dataservice/api-interface';
import { DataService } from 'src/app/service/api-dataservice/dataservice.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  characters: Characters[] = [];
  infoVisible: boolean[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCharacters();
  }
  getCharacters(): void {
    this.dataService.getCharacters().subscribe((response) => {
      this.characters = Object.values(response);

      this.infoVisible = Array(this.characters.length).fill(false);
    });
  }
  showMoreInfo(index: number): void {
    this.infoVisible[index] = !this.infoVisible[index];
  }
}
