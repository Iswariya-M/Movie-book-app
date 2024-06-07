import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
 
email: string = '';
password: string = '';
message: string = '';


constructor(private http: HttpClient, private router: Router) {}

  login() {
    const formData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:3000/login', formData).subscribe(
      (response) => {
        if (response.message === 'Admin logged in successfully') {
          alert("Amin Login Success");
          this.router.navigate(['/admin']);
        } else if (response.message === 'User logged in successfully') {
          alert("Login success");
          this.router.navigate(['/home']);
        } else {
          alert("User not found")
        }
      },
      (error) => {
       alert("login failed");
      }
    );
  }
}