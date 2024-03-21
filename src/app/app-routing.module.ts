import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { FilmsComponent } from './pages/films/films.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './service/authentication/auth.service';





const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'books', component: BooksComponent, canActivate: [AuthService] },
  { path: 'films', component: FilmsComponent, canActivate: [AuthService] },
  { path: 'characters', component: CharactersComponent, canActivate: [AuthService] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
