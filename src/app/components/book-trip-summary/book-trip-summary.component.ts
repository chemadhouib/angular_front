import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarPoolTripNoticeService } from 'src/app/services/car-pool-trip-notice.service';
import { CarPoolTripService } from 'src/app/services/car-pool-trip.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-book-trip-summary',
  standalone: true,

  imports: [SharedModule],
  templateUrl: './book-trip-summary.component.html',
  styleUrl: './book-trip-summary.component.scss'
})
export default class BookTripSummaryComponent implements OnInit {
  rating = 0;
  comment = '';
  stars = Array(5).fill(0);
  carPoolTrip: any;
  driverId : number;
  tripId: number;
  hommeSrc = "assets/images/user/avatar-homme.jpg";
  femmeSrc = "assets/images/user/avatar-femme.jpg";
  constructor(
    private activatedRoute: ActivatedRoute,
    private carPoolTripService: CarPoolTripService,
    private toastr: ToastrService,
    private carPoolTripNoticeService: CarPoolTripNoticeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.tripId = Number(params.get('carPoolTripId'));
      this.driverId = Number(params.get('driverId'));
      this.carPoolTripService.getById(this.tripId).subscribe({
        next: (response) => {
          this.carPoolTrip = response;
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
    });
  }
  setRating(star: number) {
    this.rating = star;
  }

  submitReview() {
    let carPoolTripNotice = {
      driver_id : this.driverId,
      car_pool_trip_id: this.tripId,
      rate: this.rating,
      comment: this.comment
    }
    this.carPoolTripNoticeService.add(carPoolTripNotice).subscribe(
      {
        next: (response) => {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/my-bookings');
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      }
    );
  }
}
