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

import { BooksComponent } from './pages/books/books.component';
import { FilmsComponent } from './pages/films/films.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environments } from './environments/environments';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ErrorHandlerService } from './service/error-handling/errorhandling.service';





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
        CharactersComponent,
        SignupComponent,
        LoginComponent,
        
      
    ],
    providers: [ErrorHandlerService],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        FormsModule,
        AngularFireModule.initializeApp(environments.firebaseConfig),
        BrowserAnimationsModule,
        MatCardModule,
        
    ]
})
export class AppModule { }
