import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: CustomToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.form.controls;
  }

  login() {
    this.authService
      .login(this.form.value)
      .subscribe(data => {
        if (data.success) {
          this.signInUser(data);
          this.toastr.showSuccess('Enjoy your betting', `Welcome ${data['user']['username']}`);
          this.router.navigate(['/home']);
        } else {
          this.toastr.showError(data.message)
        }
      }, err => this.toastr.showSystemError
      );
  }

  signInUser(data) {
    localStorage.setItem('token', data['token']);
    localStorage.setItem('name', data['user']['username']);
    localStorage.setItem('roles', data['user']['roles']);
  }
}