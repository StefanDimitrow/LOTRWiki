import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userEmail: string = '';
  searchQuery: any;

  constructor(private authService: AuthService, private router: Router) {}

  search(): void {
    if (this.searchQuery.trim() !== '') {
      let destinationPage: string;

      if (this.searchQuery.toLowerCase().includes('books')) {
        destinationPage = '/books';
      } else if (this.searchQuery.toLowerCase().includes('films')) {
        destinationPage = '/films';
      } else if (this.searchQuery.toLowerCase().includes('characters')) {
        destinationPage = '/characters';
      } else {
        destinationPage = '/search';
      }

      this.router.navigate([destinationPage], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.authService.getUserEmail().subscribe((email: string) => {
          this.userEmail = email;
        });
      }
    });
  }
  signout() {
    this.authService.signout();
  }
}
