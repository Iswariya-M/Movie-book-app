import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { BookingComponent } from './pages/booking/booking.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SucessComponent } from './pages/sucess/sucess.component';
import { MainComponent } from './pages/main/main.component';
import { TheaterComponent } from './pages/theater/theater.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { ViewComponent } from './pages/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    NavbarComponent,
    MoviesComponent,
    MovieDetailsComponent,
    BookingComponent,
    FooterComponent,
    PaymentComponent,
    SucessComponent,
    MainComponent,
    TheaterComponent,
    SeatsComponent,
    ViewComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
