import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    if (!this.username || !this.email || !this.password) {
      alert('Please fill out all fields');
      return;
    }

    if (!/^[a-zA-Z]+$/.test(this.username)) {
      alert('Username must contain only letters');
      return;
    }

    if (!this.validateEmail(this.email)) {
      alert('Invalid email format');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: 'user'
    };

    this.authService.signup(userData).subscribe(
      response => {
        console.log('Signup successful:', response);
        alert('Successfully signed up');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error signing up:', error);
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('User already exits or invalid');
        }
      }
    );
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
