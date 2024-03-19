import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireaut: AngularFireAuth, private router: Router) {}

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



