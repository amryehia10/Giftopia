import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [ContactService],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  isSubmitted = false;
  constructor(private service: ContactService) { }
  validator = {
    name: "",
    email: "",
    message: ""
  }

  myFormGroup = new FormGroup({
    message: new FormControl("", Validators.minLength(4)),
    name: new FormControl("", [Validators.minLength(3), Validators.pattern('[a-zA-Z]*')]),
    email: new FormControl("", [Validators.pattern('[a-zA-Z0-9]{3,}@[a-zA-Z]{3,}\\.[a-zA-Z]{2,}')])
  });

  get isNameValid() {
    const input = this.myFormGroup.controls["name"];
    if (input.errors)
      this.validator.name = NameValidator(input.errors);
    return input.valid;
  }

  get isEmailValid() {
    const input = this.myFormGroup.controls["email"];
    if (input.errors)
      this.validator.email = EmailValidator(input.errors);
    return input.valid;
  }

  get isMessageValid() {
    const input = this.myFormGroup.controls["message"];
    if (input.errors)
      this.validator.message = MessageValidator(input.errors);
    return input.valid;
  }
  private fetchFormData() {
    return {
      name: this.myFormGroup.controls["name"].value,
      email: this.myFormGroup.controls["email"].value,
      message: this.myFormGroup.controls["message"].value,
    }
  }

  private resetFormData() {
    this.myFormGroup.controls["name"].reset();
    this.myFormGroup.controls["email"].reset();
    this.myFormGroup.controls["message"].reset();
  }
  onSubmit() {
    if (this.myFormGroup.valid) {
      const ticket = this.fetchFormData();
      this.service.addNewTicket(ticket).subscribe({
        next: (data) => { console.log(data); this.isSubmitted = true; this.resetFormData()},
        error: (error) => { console.log(error); }
      });
    }
  }
}


function NameValidator(error: any): any {
  if (error.pattern)
    return "Invalid Name... Only Letters"

  else if (error.minlength)
    return "Short Name... Length Must be More than 3"
}


function EmailValidator(error: any): any {
  if (error.pattern)
    return "Invalid Email..."
}

function MessageValidator(error: any): any {
  if (error.minlength)
    return "Short Message... Length Must be More than 4"

}