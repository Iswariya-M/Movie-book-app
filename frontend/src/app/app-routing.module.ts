import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SucessComponent } from './pages/sucess/sucess.component';
import { MainComponent } from './pages/main/main.component';
import { TheaterComponent } from './pages/theater/theater.component';
import { ViewComponent } from './pages/view/view.component';
import { SeatsComponent } from './pages/seats/seats.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'view',
    component:ViewComponent
  },
  {
    path:'seats',
    component:SeatsComponent
  },
  {
    path:'movies',
    component:MoviesComponent
  },
  {
    path:'theatre',
    component:TheaterComponent
  },
  {
    path:'movie/:id',
    component:MovieDetailsComponent
  },
  {
    path:'booking',
    component:BookingComponent
  },
  {
    path:'payment',
    component:PaymentComponent
  },
  {
    path:'success',
    component:SucessComponent
  },
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
