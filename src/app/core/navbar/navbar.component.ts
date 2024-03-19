import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      
    });
  }
  signout() {
    this.authService.signout();
  }
}