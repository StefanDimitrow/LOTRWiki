import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from './characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
characters: any[ ]= [];

constructor(private http:HttpClient) {}
  
  ngOnInit(): void {
    this.getCharacters();
  }

  public getCharacters(){
    this.http.get<any>('https://lotrapi.co/api/v1/characters').subscribe((data:ApiResponse) =>{
      this.characters = data.results;
      console.log(data);
      
    })
  }
}
