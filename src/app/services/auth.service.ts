import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { BaseApiService } from './base.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private authApiUrl = this.baseUrl;
  private readonly isUserConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public readonly isUserConnected$: Observable<boolean> = this.isUserConnected.asObservable();

  constructor(private httpService: BaseApiService) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        this.isUserConnected.next(!!event.newValue);
      }
    });
  }

  register(user: User): Observable<any> {
    return this.httpService.post(this.authApiUrl + '/register', user, null, true);
  }

  login(authRequest: AuthRequest): Observable<any> {
    return this.httpService.post(this.authApiUrl + '/login', authRequest, null, true);
  }
  logout(user: User): Observable<any> {
    return this.httpService.post(this.authApiUrl + '/logout', user, null, true);
  }

  getCurrentUser(): Observable<any> {
    return this.httpService.get(this.authApiUrl + '/user', null, true);
  }
  getDriverWithComments(id: number): Observable<any> {
    return this.httpService.get(`${this.authApiUrl}/driver/${id}`, null, true);
  }
  verifyDrivingLicense(userId: number): Observable<any> {
    return this.httpService.post(this.authApiUrl + `/verify-driving-license/${userId}`, null, null, true);
  }
  saveUserIngormationsAndToken(user: User, token: string): void {
    this.saveUser(user);
    this.saveToken(token);
  }

  saveUser(user: User)
  {
    localStorage.setItem('user', JSON.stringify(user));
  }
  saveToken(token: string)
  {
    localStorage.setItem('token', token);
  }
  deleteUserIngormationsAndToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isUserConnected.next(false);
  }
  getUserFromLocalStorage(): User | null{
    return JSON.parse(localStorage.getItem('user'));
  }

  token(): string{
    return localStorage.getItem('token');
  }
}
