import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './pages/map/map.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { FilmsComponent } from './pages/films/films.component';
import { CharactersComponent } from './pages/characters/characters.component';





const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  {path:'books', component:BooksComponent} ,
  {path: 'films', component:FilmsComponent},
  {path: 'characters', component:CharactersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
