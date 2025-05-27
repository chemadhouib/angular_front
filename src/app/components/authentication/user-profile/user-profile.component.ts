import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

const isEmpty = (str) => str == null || str == '';
@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export default class UserProfileComponent implements OnInit {
  user : User;
  src = "";
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal, private toastrService: ToastrService){
    this.verifyIsUserLoggedIn();
  }
  ngOnInit(): void {
    if(this.verifyIsUserLoggedIn()){
      this.authService.getCurrentUser().subscribe((user)=> {
        this.user = user;
        this.src = `assets/images/user/avatar-${user.gender}.jpg`;
        this.authService.saveUser(user);
      });
    }
    else {
      this.router.navigate(["/auth/signin"]);
    }
  }
  verifyIsUserLoggedIn() : boolean{
    return !isEmpty(this.authService.getUserFromLocalStorage()) && !isEmpty(this.authService.token());
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(

		);
	}

  private getDismissReason(reason: any): string {
    switch (reason) {
			case ModalDismissReasons.ESC:
        return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
        return `with: ${reason}`;
      }
    }

    verifyDrivingLicense() {
     this.authService.verifyDrivingLicense(this.user.id).subscribe(
      {
        next : (response) => {
          this.toastrService.success(response.message);
          this.authService.saveUser(response.user);
          this.user = this.authService.getUserFromLocalStorage();
          this.modalService.dismissAll();
        },
        error : (error) => {this.toastrService.error(error.error.message);}
      }
     )
    }
  }
