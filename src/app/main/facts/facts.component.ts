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
  currentFactIndex = -1;
  currentFact: Facts | undefined;

  constructor(private dataService: FactsDatabaseService) { }

  ngOnInit(): void {
    this.dataService.getFacts().subscribe((data: any) => {

      this.facts = Object.keys(data).map(key => data[key]);


      this.nextFact();
    });
  }

  nextFact(): void {
    if (this.facts.length === 0) return;


    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * this.facts.length);
    } while (nextIndex === this.currentFactIndex);

    this.currentFactIndex = nextIndex;
    this.currentFact = this.facts[nextIndex];
  }

  previousFact(): void {
    if (this.facts.length === 0) return;


    let prevIndex = this.currentFactIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.facts.length - 1;
    }

    this.currentFactIndex = prevIndex;
    this.currentFact = this.facts[prevIndex];
  }
}
