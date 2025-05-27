import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseApiService } from './base.service';

@Injectable({providedIn: 'root'})
export class CarPoolTripNoticeService {
  private baseUrl = environment.apiUrl;
  private carPoolTripApiUrl = this.baseUrl;
  constructor(private httpService: BaseApiService) {}

  add(carPoolTripNotice: any): Observable<any> {
    return this.httpService.post(this.carPoolTripApiUrl + '/car-trip-notice', carPoolTripNotice, null, true);
  }

}
