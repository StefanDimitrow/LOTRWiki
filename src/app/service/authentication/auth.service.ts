import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireaut: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated().pipe(
      take(1),
      map(authenticated => {
        if (authenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.fireaut.authState.pipe(map(user => !!user));
  }

  login(email: string, password: string) {
    this.fireaut.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }, err => {
      alert('Something went wrong!');
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string) {
    this.fireaut.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration is complete!');
      this.router.navigate(['/login']);
    }, err => {
      alert('Something went wrong!');
      this.router.navigate(['/register']);
    });
  }

  signout() {
    this.fireaut.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }
}



