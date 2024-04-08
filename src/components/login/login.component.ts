import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (authService.getCurrentUser()) {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  formMsg: any = {};

  async Add() {
    if (this.validateForm(true)) {
      const { error } = await this.authService.login(
        this.MyValid.controls['email'].value ?? '',
        this.MyValid.controls['password'].value ?? ''
      );
      if (error) {
        this.formMsg['email'] = {
          msg: error['msg'],
          type: 'error',
        };
        this.formMsg['password'] = {
          msg: error['msg'],
          type: 'error',
        };
        return;
      }
      if (this.authService.getCurrentUser()) {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    }
  }

  validateForm(submited = false) {
    let errors = 0;

    // email
    if (!submited && !this.MyValid.controls['email'].valid) {
      this.formMsg['email'] = {
        msg: 'Email is not in correct format !',
        type: 'error',
      };
      errors++;
    } else if (
      submited &&
      ((this.MyValid.controls['email'].value ?? '') == '' ||
        !this.MyValid.controls['email'].valid)
    ) {
      this.formMsg['email'] = {
        msg: 'Email is not in correct format !',
        type: 'error',
      };
      errors++;
    } else if ((this.MyValid.controls['email'].value ?? '') != '') {
      this.formMsg['email'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['email'];
      errors++;
    }

    // password
    if (!submited && !this.MyValid.controls['password'].valid) {
      this.formMsg['password'] = {
        msg: 'Password should atleast have 8 characters !',
        type: 'error',
      };
      errors++;
    } else if (
      (submited && (this.MyValid.controls['password'].value ?? '') == '') ||
      !this.MyValid.controls['password'].valid
    ) {
      this.formMsg['password'] = {
        msg: 'Password should atleast have 8 characters !',
        type: 'error',
      };
      errors++;
    } else if ((this.MyValid.controls['password'].value ?? '') != '') {
      this.formMsg['password'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['password'];
      errors++;
    }
    return errors == 0;
  }

  MyValid = new FormGroup({
    email: new FormControl(
      '',
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ),
    password: new FormControl('', Validators.minLength(8)),
  });
}
