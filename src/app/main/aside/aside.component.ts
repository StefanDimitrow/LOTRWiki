import { Component } from '@angular/core';
import { trigger, style, animate, transition,state } from '@angular/animations';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  animations: [
    trigger('zoomIn', [
      state('normal', style({
        transform: 'scale(1)',
      })),
      state('hovered', style({
        transform: 'scale(1.1)', // Zoom in effect
      })),
      transition('normal => hovered', animate('200ms ease-in')),
      transition('hovered => normal', animate('200ms ease-out')),
    ]),
  ],
})
export class AsideComponent {
  imageState: string = 'normal'; // Initial state
}
