import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.email === '') {
      this.errorMessage = 'Please enter email';
      return;
    }
    if (this.password === '') {
      this.errorMessage = 'Please enter password';
      return;
    }
    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.auth
      .register(this.email, this.password, this.repeatPassword)
      .then(() => {
        this.email = '';
        this.password = '';
        this.repeatPassword = '';
      })
      .catch((error) => {
        this.errorMessage = 'Registration failed: ' + error.message;
      });
  }
}
