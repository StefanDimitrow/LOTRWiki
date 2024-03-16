import { Component, OnInit } from '@angular/core';
import { LotrapiDataserviceService } from 'src/app/service/api-dataservice/lotrapi-dataservice.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit{
  species:any[]=[];

  constructor(private dataService: LotrapiDataserviceService){}
  ngOnInit(): void {
    this.dataService.getSpecies().subscribe((data)=>{
      this.species = data.results;
    });
  }
}
