import { Component, OnInit } from '@angular/core';
import { FactsDatabaseService } from 'src/app/service/facts-database/facts-database.service';
import { Facts } from 'src/app/service/facts-database/facts-interface';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css']
})
export class FactsComponent implements OnInit {
  facts: Facts[] = [];

  constructor(private dataService: FactsDatabaseService) {}

  ngOnInit(): void {
    this.dataService.getFacts().subscribe((data: any) => {
      this.facts = Object.keys(data).map(key => data[key]);
    });
  }
}