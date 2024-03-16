import { Component, OnInit } from '@angular/core';
import { LotrapiDataserviceService } from 'src/app/service/api-dataservice/lotrapi-dataservice.service';

@Component({
  selector: 'app-realms',
  templateUrl: './realms.component.html',
  styleUrls: ['./realms.component.css']
})
export class RealmsComponent implements OnInit{
realms: any[]=[];

constructor(private dataService: LotrapiDataserviceService) {}
  ngOnInit(): void {
    this.dataService.getRealms().subscribe((data)=>{
      this.realms = data.results
    })
  }
}
