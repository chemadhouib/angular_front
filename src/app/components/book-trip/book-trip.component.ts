import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CarPoolTripService } from 'src/app/services/car-pool-trip.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-book-trip',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './book-trip.component.html',
  styleUrl: './book-trip.component.scss'
})
export default class BookTripComponent implements OnInit {
  carPoolTrip: any;
  passengersNumber = 0;
  isUserConnected = false;
  hommeSrc = "assets/images/user/avatar-homme.jpg";
  femmeSrc = "assets/images/user/avatar-femme.jpg";

  constructor(
    private carPoolTripService: CarPoolTripService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService
  ) {}
  ngOnInit(): void {
    this.authService.isUserConnected$.subscribe(isUserConnected => {
      this.isUserConnected = isUserConnected;
    })
    this.route.paramMap.subscribe((params) => {
      let tripId = Number(params.get('id'));
      this.passengersNumber = Number(params.get('passengers'));
      this.carPoolTripService.getById(tripId).subscribe({
        next: (response) => {
          this.carPoolTrip = response;
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
    });
  }

  sendBookingRequest() {
    let bookingRequest = {
      driver_id: this.carPoolTrip.user_id,
      car_pool_trip_id: this.carPoolTrip.id,
      total_seats: this.passengersNumber
    };
    this.carPoolTripService.sendBookingRequest(bookingRequest).subscribe({
      next: () => {
        this.toastr.success('La demande de réservation à été bien ajoutée');
        this.router.navigateByUrl("/home");
      },
      error: (error) => {
        let msg = error.error?.message? error.error.message : error.error.error;
        this.toastr.error(msg);
      }
    });
  }
  goToDriver(driverId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/driver', driverId])
    );
    window.open(url, '_blank');
    }

    goToSigIn() {
      const urlTree = this.router.createUrlTree(['/auth/signin'], {
        queryParams: { closeAfterLogin: true }
      });
      const fullUrl = this.router.serializeUrl(urlTree);
      window.open(fullUrl, '_blank');
    }
}
