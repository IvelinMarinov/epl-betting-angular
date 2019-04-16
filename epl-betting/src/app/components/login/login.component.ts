import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    console.log('constructor login')
   }

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
        console.log(data);
        localStorage.setItem('token', data['token']);
        localStorage.setItem('name', data['user']['username']);
        this.router.navigate(['/home']);
      }, err => {
        console.log('ERROR', err);
      });
  }
}
