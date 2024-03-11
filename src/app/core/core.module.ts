import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavbarComponent,HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
   
  ],
  exports: [NavbarComponent,
    HeaderComponent,
    FooterComponent]
})
export class CoreModule { }
