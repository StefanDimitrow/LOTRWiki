import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/authentication/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userEmail: string | null = null;
  userPosts: any[] = []; // Property to hold user's posts
charactersLists: any;
post: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch user's email
    this.authService.getUserEmail().subscribe(email => {
      this.userEmail = email;
    }, error => {
      console.error('Error retrieving user email:', error);
    });
  
    // Fetch user's characters
    this.authService.getUserCharacters().subscribe(characters => {
      this.charactersLists = characters;
    }, error => {
      console.error('Error retrieving characters:', error);
    });
}
  

  signOut(): void {
    this.authService.signout();
  }
}

