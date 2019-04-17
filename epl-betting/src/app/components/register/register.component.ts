import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm')
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{4,15}$')]],
      repeatPassword: ['', Validators.required]
    }, {
        validator: this.passwordsMustMatch()
      })
  }

  get f() {
    return this.form.controls;
  }

  passwordsMustMatch() {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls['password'];
      const repeatPass = formGroup.controls['repeatPassword'];

      if (repeatPass.errors && !repeatPass.errors.mustMatch) {
        return;
      }

      if (pass.value !== repeatPass.value) {
        repeatPass.setErrors({ mustMatch: true });
      } else {
        repeatPass.setErrors(null);
      }
    }
  }

  validateDateOfBirth(control: AbstractControl) {
    if (control.errors) {
      return null;
    }

    const dobStr = control.value;

    if (!Date.parse(dobStr)) {
      return { invalidDate: true }
    }

    let dob = new Date(dobStr);
    let ageDiffMs = Date.now() - dob.getTime();
    let ageDate = new Date(ageDiffMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      return { underAge: true }
    }

    return null;
  }

  register() {
    const reqBody = {
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      dateOfBirth: this.f.dateOfBirth.value
    }

      this.authService
        .register(reqBody)
        .subscribe(data => {
          if(data.success) {
            this.showSuccess(data.message)
            this.router.navigate(['/login']);
          } else {
            this.showError(data.message)
          }
        }, (err) => {
          this.showError('Something went wrong. Please try again later.', 'ERROR');
        });
  }

  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title?: string): void {
    this.toastr.error(message)
  }
}