import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
      },
      {
        path: 'new-trip',
        loadComponent: () => import('./components/trips/new-trip/new-trip.component')
      },
      {
        path: 'search-results',
        loadComponent: () => import('./components/trips/trip-search/trip-search.component')
      },
      {
        path:'book-trip/:id/:passengers',
        loadComponent : () => import('./components/book-trip/book-trip.component')
      },
      {
        path:'book-trip-summary/:carPoolTripId/:driverId/:passengerId',
        loadComponent : () => import('./components/book-trip-summary/book-trip-summary.component')
      },
      {
        path:'user-profile',
        loadComponent : () => import('./components/authentication/user-profile/user-profile.component')
      },
      {
        path:'my-booking-requests',
        loadComponent : () => import('./components/my-booking-requests/my-booking-requests.component')
      },
      {
        path:'my-bookings',
        loadComponent : () => import('./components/my-bookings/my-bookings.component')
      },
      {
        path:'driver/:id',
        loadComponent : () => import('./components/authentication/user-profile-comments/user-profile-comments.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./components/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
