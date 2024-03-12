import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [NavbarComponent, HeaderComponent, FooterComponent],
    exports: [NavbarComponent,
        HeaderComponent,
        FooterComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class CoreModule { }
