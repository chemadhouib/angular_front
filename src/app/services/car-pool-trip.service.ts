import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarPoolTrip } from '../models/car-pool-trip.model';
import { BaseApiService } from './base.service';

@Injectable({providedIn: 'root'})
export class CarPoolTripService {
  private baseUrl = environment.apiUrl;
  private carPoolTripApiUrl = this.baseUrl;
  constructor(private httpService: BaseApiService) {}

  add(carPoolTrip: CarPoolTrip): Observable<any> {
    return this.httpService.post(this.carPoolTripApiUrl + '/car-pool-trip', carPoolTrip, null, true);
  }

  search(searchFilter: any): Observable<any> {
    return this.httpService.post(this.carPoolTripApiUrl + '/car-pool-trip-search', searchFilter, null, true);
  }
  getById(id: number): Observable<any> {
    return this.httpService.get(`${this.carPoolTripApiUrl}/car-pool-trip/${id}`, null, true);
  }

  sendBookingRequest(request: any): Observable<any> {
    return this.httpService.post(this.carPoolTripApiUrl + '/car-pool-trip-booking-request', request, null, true);
  }
  getMyBookingRequest(): Observable<any> {
    return this.httpService.get(`${this.carPoolTripApiUrl}/my-booking-request`, null, true);
  }
  getMyBooking(): Observable<any> {
    return this.httpService.get(`${this.carPoolTripApiUrl}/my-booking`, null, true);
  }
  acceptBookingRequest(id: number): Observable<any> {
    return this.httpService.post(`${this.carPoolTripApiUrl}/accept-booking/${id}`,null, null, true);
  }
  refuseBookingRequest(id: number): Observable<any> {
    return this.httpService.post(`${this.carPoolTripApiUrl}/refuse-booking/${id}`,null, null, true);
  }
}
