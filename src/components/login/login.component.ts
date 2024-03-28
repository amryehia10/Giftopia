import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Add(){
    if(this.MyValid.valid &&
       this.MyValid.controls["email"].value != "" &&
       this.MyValid.controls["password"].value != "")
    {
      alert("YAY, Your form is Valid :)");
    }
    else
    {
      alert("Oh no! Your form is NOT valid :(");
    }
  }

  get emailValid(){
    return this.MyValid.controls["email"].valid;
  }

  get passwordValid(){
    return this.MyValid.controls["password"].valid;
  }

  MyValid = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.minLength(8))
  })
}