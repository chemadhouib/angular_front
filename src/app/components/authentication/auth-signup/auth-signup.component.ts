import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent implements OnInit {
  formClasses = 'card-body text-center';
  public userForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('homme', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  public signUp(): void {
    if (this.userForm.valid) {
      let user = Object.assign(new User(), this.userForm.getRawValue());
      console.log(user);
      this.authService.register(user).subscribe(
        { next: () => {
          this.toastr.success('Le compte à été bien ajouté');
          this.router.navigateByUrl('/auth/signin');
        }
      , error: (error) => {this.toastr.error(error.error.message)} });

    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
