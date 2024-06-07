// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrl: './payment.component.css'
// })

// export class PaymentComponent {
//   formData: any = {
//     name: '',
//     email: '',
//     creditCard: '',
//     pin: ''
//   };

//   constructor(private router: Router) {}

//   submitPayment(): void {
//     if (!this.formData.name || !this.formData.email || !this.formData.creditCard || !this.formData.pin) {
//       alert('Please fill out all fields');
//       return;
//     }

//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (!nameRegex.test(this.formData.name)) {
//       alert('Name should contain only letters');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(this.formData.email)) {
//     alert('Invalid email address');
//     return;
//   }

//     const creditCardNumber = this.formData.creditCard.replace(/\s/g, '');
//     const creditCardRegex = /^\d{16,19}$/;
//     if (!creditCardRegex.test(creditCardNumber)) {
//       alert('Credit card number must be between 16 to 19 digits');
//       return;
//     }

//     const pinRegex = /^\d{4}$/;
//     if (!pinRegex.test(this.formData.pin)) {
//       alert('PIN must be exactly 4 digits');
//       return;
//     }

    
//     this.router.navigate(['/success'], { state: { formData: this.formData } });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  booking: any;
  totalAmount!: number;
  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.booking = navigation.extras.state['booking'];
      this.totalAmount = this.booking.seats * 120;
    }
  }

  ngOnInit(): void {}

  processPayment() {
    // Implement payment processing logic here
    console.log('Processing payment for:', this.booking);
    console.log('Payment details:', this.paymentDetails);
    this.router.navigate(['/success'], { 
      state: { 
        booking: this.booking, 
        totalAmount: this.totalAmount 
      } 
    });
  }
}
