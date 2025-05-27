import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule],
  providers:[AuthService],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent implements OnInit {
  public authForm: FormGroup;
  closeAfterLogin = false;
  constructor(private authService: AuthService, private toastrService: ToastrService, private router: Router, private activatedRoute: ActivatedRoute){

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.closeAfterLogin = params.get('closeAfterLogin') === 'true';
    })
  }
  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  public login(): void {
    if (this.authForm.valid) {
      let user = Object.assign(new AuthRequest(), this.authForm.getRawValue());
      this.authService.login(user).subscribe(
        { next: (response) => {
          this.toastrService.success(response.message);
          this.authService.saveUserIngormationsAndToken(response.user, response.token);
          this.closeAfterLogin ? window.close() : this.router.navigateByUrl("/home");
        }
      , error: (error) => {this.toastrService.error(error.error.message)} });

    } else {
      this.authForm.markAllAsTouched();
    }
  }
}
