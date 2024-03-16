import { Component, OnInit} from '@angular/core';
import { LotrapiDataserviceService } from 'src/app/service/api-dataservice/lotrapi-dataservice.service';



@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{
  films: any[] =[];

  constructor(private dataService: LotrapiDataserviceService) {}
  ngOnInit(): void {
   this.dataService.getFilms().subscribe((data) =>{
    this.films = data.results;
    console.log(data);
    
   })
  }

}