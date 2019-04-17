import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
          this.showSuccess('Enjoy your betting', `Welcome ${data['user']['username']}`);
          this.router.navigate(['/home']);
        } else {
          this.showError(data.message)
        }
      }, err => {
        this.showError('Something went wrong. Please try again later.', 'ERROR');
      });
  }

  signInUser(data) {
    localStorage.setItem('token', data['token']);
    localStorage.setItem('name', data['user']['username']);
    localStorage.setItem('roles', data['user']['roles']);
  }

  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title?: string): void {
    this.toastr.error(message)
  }
}