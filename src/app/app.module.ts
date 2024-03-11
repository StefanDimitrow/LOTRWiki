import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { MainComponent } from './main/main.component';
import { FactsComponent } from './main/facts/facts.component';
import { AsideComponent } from './main/aside/aside.component';
import { MapComponent } from './pages/map/map.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        FactsComponent,
        AsideComponent,
        MapComponent,
        HomeComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,

    ]
})
export class AppModule { }
