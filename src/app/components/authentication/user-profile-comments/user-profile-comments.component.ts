import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

const isEmpty = (str) => str == null || str == '';
@Component({
  selector: 'app-user-profile-comments',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-profile-comments.component.html',
  styleUrl: './user-profile-comments.component.scss'
})
export default class UserProfileCommentsComponent implements OnInit {
  user : User;
  src = '';
  constructor(private authService: AuthService, private activatedRouter: ActivatedRoute, private modalService: NgbModal, private toastrService: ToastrService){

  }
  ngOnInit(): void {
    this.initUser();
  }

  initUser(){
    this.activatedRouter.paramMap.subscribe(param => {
      let driverId = Number(param.get('id'));
      this.authService.getDriverWithComments(driverId).subscribe(
        {
          next : (response) => {
            this.user = response;
            this.src = `assets/images/user/avatar-${this.user.gender}.jpg`
          },
          error : (error) => {this.toastrService.error(error.error.message);}
        }
       )
    });
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
        error : (error) => {this.toastrService.success(error.error.message);}
      }
     )
    }
  }
