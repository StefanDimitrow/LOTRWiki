import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 

  isLoggedIn = false;
  userEmail: string = '';
searchQuery: any;

  constructor(private authService: AuthService,private router: Router) { }


  search(): void {
    if (this.searchQuery.trim() !== '') {
      let destinationPage: string;

      // Determine the corresponding page based on the search query
      // For example, if the search query contains 'books', redirect to the books page
      if (this.searchQuery.toLowerCase().includes('books')) {
        destinationPage = '/books';
      } else if (this.searchQuery.toLowerCase().includes('films')) {
        destinationPage = '/films';
      } else if (this.searchQuery.toLowerCase().includes('characters')) {
        destinationPage = '/characters';
      } else {
        // If the search query doesn't match any predefined criteria, redirect to a generic search page
        destinationPage = '/search';
      }

      // Navigate to the corresponding page with the search query as a route parameter
      this.router.navigate([destinationPage], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
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