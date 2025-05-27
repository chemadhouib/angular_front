import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CarPoolTripService } from 'src/app/services/car-pool-trip.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-trip-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.scss']
})
export default class SamplePageComponent {

  isCollapsed = true;
  sortOption: 'departure' | 'priceSort' = 'departure';
  petsFilter = false;
  cigaretteFilter = false;
  carPoolTrips = [];
  carPoolTripsFilter = [];
  availableSeats = 0;
  searchForm: FormGroup;
  minDate: NgbDateStruct;
  hommeSrc = "assets/images/user/avatar-homme.jpg";
  femmeSrc = "assets/images/user/avatar-femme.jpg";
  isUserConnected = false;
  searchFilter : any;
  constructor(
    private carPoolTripService: CarPoolTripService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.isUserConnected$.subscribe(isUserConnected => {
      this.isUserConnected = isUserConnected;
    })
    let today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      let filters = {
        departure: params['departure'],
        arrival: params['arrival'],
        availableSeats: params['availableSeats'],
        date: params['date']
      };
      let date = params['date'].split("-");
      filters.date = {year: Number(date[0]), month: Number(date[1]), day: Number(date[2])};
      this.searchForm.patchValue(filters);
      this.availableSeats = filters.availableSeats;
      this.getTrips();
    });
  }
  initForm() {
    this.searchForm = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      availableSeats: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)])
    });
  }
  sort() {
    // Filtrage
    this.carPoolTripsFilter = this.carPoolTrips.filter((trip) => {
      if (this.petsFilter && this.cigaretteFilter) {
        // Garder les trajets qui ont au moins un des deux à true
        return trip.petsAllowed === true || trip.smokingAllowed === true;
      } else if (this.petsFilter) {
        return trip.petsAllowed === true;
      } else if (this.cigaretteFilter) {
        return trip.smokingAllowed === true;
      }
      return true; // Aucun filtre activé : tout pas
    });

    // Tri
    if (this.sortOption === 'departure') {
      this.carPoolTripsFilter.sort((a, b) => {
        const timeA = parseInt(a.start.replace(':', '')); // "08:30" → 830
        const timeB = parseInt(b.start.replace(':', ''));
        return timeA - timeB;
      });
    } else if (this.sortOption === 'priceSort') {
      this.carPoolTripsFilter.sort((a, b) => a.price - b.price);
    }
  }
  goToBookingTrip(id: number): void {
    this.router.navigate(['book-trip', id, this.availableSeats]);
  }
  goToDriver(driverId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/driver', driverId])
    );
    window.open(url, '_blank');
    }

    search() {
      if (this.searchForm.valid) {
        this.searchFilter = Object.assign({}, this.searchForm.getRawValue());
        let formDate = this.searchForm.get('date').value;
        let localDate = new Date(formDate.year, formDate.month - 1, formDate.day);

        // Format en YYYY-MM-DD manuellement pour éviter le UTC shift
        let yyyy = localDate.getFullYear();
        let mm = String(localDate.getMonth() + 1).padStart(2, '0');
        let dd = String(localDate.getDate()).padStart(2, '0');

        this.searchFilter.date = `${yyyy}-${mm}-${dd}`;
        this.router.navigate(['/search-results'], {
          queryParams: {
            departure: this.searchFilter.departure,
            arrival: this.searchFilter.arrival,
            availableSeats: this.searchFilter.availableSeats,
            date: this.searchFilter.date
          }
        });

      } else {
        this.searchForm.markAllAsTouched();
      }
    }
    getTrips(){
      this.carPoolTripService.search(this.searchFilter).subscribe({
        next: (response) => {
          this.carPoolTrips = response;
          this.carPoolTripsFilter = this.carPoolTrips.slice(0);
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
    }
}
