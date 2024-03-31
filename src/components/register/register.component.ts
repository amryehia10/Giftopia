import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  currentPage: number = 1;
  userData: any = {
    name: '',
    email: '',
    password: '',
    gender: '',
    age: null,
    profileImage: null,
    mobileNumber: '',
    address: '',
    creditCard: ''
  };
  additionalMobiles: { number: string }[] = [];
  additionalAddresses: { address: string }[] = [];
  additionalCreditCards: { cardNumber: string }[] = [];

  // extractSecondAddress(): string {
  //   if (this.additionalAddresses.length > 1) {
  //     return this.additionalAddresses[1].address;
  //   } else {
  //     return ''; // Return empty string if there is no second address
  //   }
  // }


  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }
  

  register() {
    if (this.userData.name.length < 3 || this.userData.age < 10 || this.userData.age > 100 || this.userData.password.length < 8 || !this.validateEmail(this.userData.email) || this.userData.mobileNumber.length !== 11 || this.userData.address === '') {
      alert('Please fill in all required fields correctly!');
      return;
    }
    else
    {
      alert('Sucessfully Registered!');
    }
    // Registration logic here
  }

  imageUrl: string | ArrayBuffer | null = null;
  enlargeImageVisible: boolean = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEnlargeImage() {
    this.enlargeImageVisible = !this.enlargeImageVisible;
  }

  addMobile() {
    if (this.additionalMobiles.length < 2) {
        this.additionalMobiles.push({ number: '' });
    } else {
        // Optionally, you can provide feedback to the user that the limit is reached
        console.log("Maximum limit of mobile numbers reached.");
    }
}

addAddress() {
    if (this.additionalAddresses.length < 2) {
        this.additionalAddresses.push({ address: '' });
    } else {
        console.log("Maximum limit of addresses reached.");
    }
}

addCreditCard() {
    if (this.additionalCreditCards.length < 2) {
        this.additionalCreditCards.push({ cardNumber: '' });
    } else {
        console.log("Maximum limit of credit card numbers reached.");
    }
}



  removeMobile(index: number) {
    this.additionalMobiles.splice(index, 1);
  }

  

  removeAddress(index: number) {
    this.additionalAddresses.splice(index, 1);
  }

  

  removeCreditCard(index: number) {
    this.additionalCreditCards.splice(index, 1);
  }

  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  get nameNotValid(){
    return (this.userData.name.length < 3 && this.userData.name != '');
  }

  get ageNotValid(){
    return ((this.userData.age < 10 || this.userData.age > 100)  && this.userData.age != null);
  }

  get passwordNotValid(){
    return (this.userData.password.length < 8  && this.userData.password != '');
  }

  get emailNotValid(){
    return (!this.validateEmail(this.userData.email) && this.userData.email != '');
  }

  get mobileNotValid(){
    return (this.userData.mobileNumber.length !== 11 && this.userData.mobileNumber != '');
  }

  get addressNotValid(){
    return (this.userData.address.length < 10 && this.userData.address != '');
  }
  
}
