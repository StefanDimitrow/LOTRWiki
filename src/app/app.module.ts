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
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NavBtnComponent } from './shared/nav-btn/nav-btn.component';
import { BooksComponent } from './pages/books/books.component';
import { FilmsComponent } from './pages/films/films.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        FactsComponent,
        AsideComponent,
        MapComponent,
        HomeComponent,
        BooksComponent,
        FilmsComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule
    ]
})
export class AppModule { }
