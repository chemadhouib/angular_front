// angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import SpinnerComponent from '../spinner/spinner.component';

@Component({
  selector: 'app-guest',
  imports: [RouterModule, SpinnerComponent],
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {}
