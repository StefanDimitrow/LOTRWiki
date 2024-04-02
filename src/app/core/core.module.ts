import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
    declarations: [NavbarComponent, HeaderComponent, FooterComponent, DashboardComponent],
    exports: [NavbarComponent, HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        RouterModule, 
        SharedModule
    ]
})
export class CoreModule { }
