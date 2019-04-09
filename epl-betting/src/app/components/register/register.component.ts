import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm')
  form;

  constructor(private fb: FormBuilder) { }

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
    if(control.errors) {
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

    if(age < 18) {
      return { underAge: true }
    }

    return null;
  }

  register() {
    console.log(this.form)
  }
}