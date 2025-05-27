import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BaseApiService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json')
      .append('Cache-Control', 'no-cache')
      .append('pragma', 'no-cahce')
      .append('Access-Control-Allow-Origin', '*');
  }

  get<T>(url: string, params?: HttpParams, withCredentials: boolean = false): Observable<T> {
    if (params) {
      return this.http.get<T>(url, { headers: this.headers, params: params, withCredentials: withCredentials });
    }
    return this.http.get<T>(url, { headers: this.headers, withCredentials: withCredentials });
  }

  post<T>(url: string, body: any, params?: HttpParams, withCredentials: boolean = false): Observable<T> {
    if (params) {
      return this.http.post<T>(url, body, { headers: this.headers, params: params, withCredentials: withCredentials });
    }
    return this.http.post<T>(url, body, { headers: this.headers, withCredentials: withCredentials });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body, { headers: this.headers });
  }

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    if (params) {
      return this.http.delete<T>(url, { headers: this.headers, params: params});
    }
    return this.http.delete<T>(url, { headers: this.headers });
  }
}
