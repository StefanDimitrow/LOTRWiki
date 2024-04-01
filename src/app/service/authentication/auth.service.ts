import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireaut: AngularFireAuth, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
  getUserID(): Observable<string | null> {
    return this.fireaut.authState.pipe(
      map(user => user ? user.uid : null)
    );
  
  }
  getUserEmail(): Observable<any> {
    return this.fireaut.authState.pipe(
      map(user => user ? user.email : null)
    );
  }

  login(email: string, password: string) {
    this.fireaut.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }, _err => {
      alert('Something went wrong!');
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string) {
    this.fireaut.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration is complete!');
      this.router.navigate(['/login']);
    }, _err => {
      alert('Something went wrong!');
      this.router.navigate(['/register']);
    });
  }

  signout() {
    this.fireaut.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
    });
  }
}



