import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarPoolTripService } from 'src/app/services/car-pool-trip.service';

@Component({
  selector: 'app-my-booking-requests',
  imports: [CommonModule],
  templateUrl: './my-booking-requests.component.html',
  styleUrl: './my-booking-requests.component.scss'
})
export default class MyBookingRequestsComponent implements OnInit {
  carPoolTripsBookingRequest = [];
  hommeSrc = "assets/images/user/avatar-homme.jpg";
  femmeSrc = "assets/images/user/avatar-femme.jpg";
  constructor(
    private carPoolTripService: CarPoolTripService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getMyBookingRequest();
  }
  getMyBookingRequest(){
    this.carPoolTripService.getMyBookingRequest().subscribe({
      next: (response) => {
        this.carPoolTripsBookingRequest = response;
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    });
  }
  accept(id: number): void {
    this.carPoolTripService.acceptBookingRequest(id).subscribe({
      next: () => {
        this.toastr.success("Demande acceptée");
        this.getMyBookingRequest();
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    });
  }
  refuse(id: number): void {
    this.carPoolTripService.refuseBookingRequest(id).subscribe({
      next: () => {
        this.toastr.success("Demande refusée");
        this.getMyBookingRequest();
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    });
  }
}
