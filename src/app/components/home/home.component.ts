// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SharedModule, NgbDatepickerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  minDate: NgbDateStruct;
  constructor(private router: Router) {}
  ngOnInit(): void {
    let today = new Date();
    this.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.initForm();
  }
  initForm() {
    this.searchForm = new FormGroup({
      departure: new FormControl('', Validators.required),
      arrival: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
      availableSeats: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)])
    });
  }
  search() {
    if (this.searchForm.valid) {
      let searchFilter = Object.assign({}, this.searchForm.getRawValue());
      let formDate = this.searchForm.get('date').value;
      let localDate = new Date(formDate.year, formDate.month - 1, formDate.day);

      // Format en YYYY-MM-DD manuellement pour éviter le UTC shift
      let yyyy = localDate.getFullYear();
      let mm = String(localDate.getMonth() + 1).padStart(2, '0');
      let dd = String(localDate.getDate()).padStart(2, '0');

      searchFilter.date = `${yyyy}-${mm}-${dd}`;

      this.router.navigate(['/search-results'], {
        queryParams: {
          departure: searchFilter.departure,
          arrival: searchFilter.arrival,
          availableSeats: searchFilter.availableSeats,
          date: searchFilter.date
        }
      });
    } else {
      this.searchForm.markAllAsTouched();
    }
  }
}
