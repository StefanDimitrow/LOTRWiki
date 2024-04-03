import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireaut: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthenticated().pipe(
      take(1),
      map((authenticated) => {
        if (authenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.fireaut.authState.pipe(map((user) => !!user));
  }
  getUserID(): Observable<string | null> {
    return this.fireaut.authState.pipe(map((user) => (user ? user.uid : null)));
  }
  getUserEmail(): Observable<any> {
    return this.fireaut.authState.pipe(
      map((user) => (user ? user.email : null))
    );
  }
  getUserCharacters(): Observable<any[]> {
    return this.getUserID().pipe(
      switchMap((userId: string | null) => {
        if (userId) {
          return this.firestore
            .collection('Characters', (ref) =>
              ref.where('userId', '==', userId)
            )
            .valueChanges({ idField: 'characterId' });
        } else {
          return of([]);
        }
      })
    );
  }

  login(email: string, password: string) {
    this.fireaut.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/home']);
      },
      (_err) => {
        alert('Please enter valid credentials!');
        this.router.navigate(['/login']);
      }
    );
  }

  register(
    email: string,
    password: string,
    repeatPassword: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (password !== repeatPassword) {
        reject(new Error('Passwords do not match'));
        return;
      }

      this.fireaut
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert('Registration is complete!');
          this.router.navigate(['/login']);
          resolve();
        })
        .catch((error) => {
          alert('Please enter valid credentials!');
          this.router.navigate(['/register']);
          reject(error);
        });
    });
  }
  signout() {
    this.fireaut.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
