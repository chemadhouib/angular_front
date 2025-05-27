// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgbDateStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarPoolTrip } from 'src/app/models/car-pool-trip.model';
import { CarPoolTripService } from 'src/app/services/car-pool-trip.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-trip',
  standalone: true,
  imports: [SharedModule, NgbTimepickerModule],
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export default class NewTripComponent implements OnInit {
  carPoolTripFrom : FormGroup;
  minDate: NgbDateStruct;
  constructor(private carPoolTripService: CarPoolTripService, private toastr : ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    let today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.initForm();
  }
  initForm() {
    this.carPoolTripFrom = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      duration: new FormControl(null, [Validators.required, Validators.min(1)]),
      totalSeats: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(3)]),
      luggageType: new FormControl('Aucun baggage', Validators.required),
      petsAllowed: new FormControl(false, Validators.required),
      smokingAllowed: new FormControl(false, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      time: new FormControl({ hour: new Date().getHours(), minute: new Date().getMinutes() }, [Validators.required])

    });
  }

  save(){
    if(this.carPoolTripFrom.valid){
      let carPoolTrip : CarPoolTrip = Object.assign(new CarPoolTrip(), this.carPoolTripFrom.getRawValue());
      let formDate = this.carPoolTripFrom.get("date").value
      let time = this.carPoolTripFrom.get("time").value;
      let date = new Date(formDate.year,formDate.month -1,formDate.day,time.hour,time.minute);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      carPoolTrip.date = localDate;
      carPoolTrip.availableSeats = carPoolTrip.totalSeats;
      this.carPoolTripService.add(carPoolTrip).subscribe(
        { next: () => {
          this.toastr.success('Le trajet à été bien publié');
          this.router.navigateByUrl('/home');
        }
      , error: (error) => {this.toastr.error(error.error.message)} });
    }
    else {
      this.carPoolTripFrom.markAllAsTouched()
    }
  }
}
