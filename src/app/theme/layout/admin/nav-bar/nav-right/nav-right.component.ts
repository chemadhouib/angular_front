// angular import
import { Component, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig, AuthService]
})
export class NavRightComponent {
  // public props
  isUserLoggedIn = false;
  user: User;
  hommeSrc = "assets/images/user/avatar-homme.jpg";
  femmeSrc = "assets/images/user/avatar-femme.jpg";
  // constructor
  constructor(private authService: AuthService, private toastrService: ToastrService, private route: Router) {
    const config = inject(NgbDropdownConfig);

    config.placement = 'bottom-right';
    this.verifyIsUserLoggedIn();
  }

  verifyIsUserLoggedIn(){
    this.authService.isUserConnected$.subscribe(isUserConnected => {
      this.isUserLoggedIn = isUserConnected;
      this.user = this.authService.getUserFromLocalStorage();
    });
  }
  logout(){
    this.authService.logout(this.user).subscribe(
      { next: (response) => {
        this.toastrService.success(response.message);
        this.authService.deleteUserIngormationsAndToken();
        this.route.navigateByUrl('/home');
      }
    , error: (error) => {this.toastrService.error(error.error.message)} });
  }
  goToSignIn(){
    this.route.navigateByUrl('/auth/signin');
  }
  goToNewTrip(){
    this.route.navigateByUrl('/new-trip');
  }
}
