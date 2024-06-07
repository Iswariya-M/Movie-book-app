import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.css'
})
export class SucessComponent implements OnInit {
  booking: any;
  totalAmount!: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.booking = navigation.extras.state['booking'];
      this.totalAmount = navigation.extras.state['totalAmount'];
    }
  }

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['/home']);
  }
}