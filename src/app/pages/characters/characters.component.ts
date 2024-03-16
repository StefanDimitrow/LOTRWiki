
import { Component, OnInit } from '@angular/core';
import { LotrapiDataserviceService } from 'src/app/service/api-dataservice/lotrapi-dataservice.service';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit{
  characters: any[]=[];
  
  constructor(private dataService: LotrapiDataserviceService){}
  ngOnInit(): void {
    this.dataService.getCharacters().subscribe((data)=>{
      this.characters = data.results;
      console.log(data);
      

    })
  }
}
