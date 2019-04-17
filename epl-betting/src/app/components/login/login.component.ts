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
        this.signInUser(data);
        this.showSuccess();
        console.log(this.toastr)

        this.router.navigate(['/home']);
      }, err => {
        console.log('ERROR', err);
      });
  }

  signInUser(data) {
    localStorage.setItem('token', data['token']);
    localStorage.setItem('name', data['user']['username']);
    localStorage.setItem('roles', data['user']['roles']);
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}