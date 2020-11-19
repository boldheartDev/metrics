import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

import { AlertService } from '../../../../shared/service/alert/alert.service';
import { AuthService } from '@core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../../app.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: Boolean = false;
  submitted: Boolean = false;
  returnUrl: string;
  showForgotPassword: Boolean = false;

  home: string;
  
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    //Reset login status
    this.authService.logout();
  }

  toggleForgotPassword(){}
  //Getter for access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
   
    //Stop if form is invalid
    if(this.loginForm.invalid){
      return;
    }

    this.isLoading = true;
    this.authService.login(this.f.email.value, Md5.hashStr(this.f.password.value))
      .pipe(first())
      .subscribe(
        data => {
          
          //Get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/appointments';
          this.router.navigate([this.returnUrl])
        },
        error => {
          this.alertService.error(error);
          this.isLoading = false;
        });
  }
}
