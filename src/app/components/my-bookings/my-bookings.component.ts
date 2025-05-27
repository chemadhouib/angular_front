import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarPoolTripService } from 'src/app/services/car-pool-trip.service';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export default class MyBookingsComponent implements OnInit{

  carPoolTripsBooking = [];
  hommeSrc = "assets/images/user/avatar-homme.jpg";
  femmeSrc = "assets/images/user/avatar-femme.jpg";
  constructor(
    private carPoolTripService: CarPoolTripService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.carPoolTripService.getMyBooking().subscribe({
      next: (response) => {
        this.carPoolTripsBooking = response;
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    });
  }
  getStatusClasse(status: string){

    switch(status.toLocaleLowerCase()){
      case 'pending' : return 'bg-warning'; break;
      case 'confirmed' : return 'bg-success'; break;
      case 'refused' : return 'bg-danger'; break;
      default : return '';
    }
  }

  getStatusName(status: string){

    switch(status.toLocaleLowerCase()){
      case 'pending' : return 'En attente'; break;
      case 'confirmed' : return 'Acceptée'; break;
      case 'refused' : return 'Refusé'; break;
      default : return '';
    }
  }
}
