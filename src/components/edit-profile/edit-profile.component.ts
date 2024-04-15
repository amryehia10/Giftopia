import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../../config.json';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    if (!authService.getCurrentUser()) {
      router.navigateByUrl('/login').then(() => {
        window.location.reload();
      });
    }
  }
  async ngOnInit() {
    const { data, error } = await this.authService.getUserDetails();

    if (data) {
      this.user = data as RegUser;

      this.http
        .get(`${apiEndpoint}/${this.user.profileImage}` + '', {
          responseType: 'blob',
        })
        .subscribe((blob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageDataUrl = reader.result;
          };
          reader.readAsDataURL(blob);
        });
    } else alert(error);
  }

  MaxPhone = 3;
  MaxAddress = 3;
  user: RegUser = {
    name: '',
    email: '',
    password: '',
    gender: '',
    age: null,
    profileImage: null,
    phone: [{ number: '' }],
    address: [{ address: '' }],
  };
  imageDataUrl: string | ArrayBuffer | null = null;
  enlargeImageVisible: boolean = false;
  formMsg: { [key: string]: any } = {};

  async updateUser() {
    if (this.validateForm(true)) {
      console.log(this.user);

      const { error, data } = await this.authService.update(this.user);
      if (error) {
        if (!error['details']) alert(error['msg']);
        else {
          this.formMsg = { ...this.formMsg, ...(error['details'] || {}) };
          return;
        }
      }
      if (data) {
        alert('Updated Successfully!');
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
          window.scrollTo(0, 0);
        });
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataUrl = reader.result;
      };
      this.user.profileImage = file;
      reader.readAsDataURL(file);
    }
  }

  validateForm(submited = false) {
    let errors = 0;
    // name
    if (
      !submited &&
      this.user.name != '' &&
      !this.validateName(this.user.name)
    ) {
      this.formMsg['name'] = {
        msg: 'Name must be between 3 to 20 characters!',
        type: 'error',
      };
      errors++;
    } else if (submited && !this.validateName(this.user.name)) {
      this.formMsg['name'] = {
        msg: 'Name must be between 3 to 20 characters!',
        type: 'error',
      };
      errors++;
    } else if (this.user.name != '') {
      this.formMsg['name'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['name'];
      errors++;
    }

    // email
    if (
      !submited &&
      this.user?.email != '' &&
      !this.validateEmail(this.user?.email)
    ) {
      this.formMsg['email'] = {
        msg: 'Email is not in correct format!',
        type: 'error',
      };
      errors++;
    } else if (submited && !this.validateEmail(this.user.email)) {
      this.formMsg['email'] = {
        msg: 'Email is not in correct format!',
        type: 'error',
      };
      errors++;
    } else if (this.user.email != '') {
      this.formMsg['email'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['email'];
      errors++;
    }

    //password
    if (
      !submited &&
      this.user.password != '' &&
      !this.validatePassword(this.user.password)
    ) {
      this.formMsg['password'] = {
        msg: 'Password must be between 8 to 64 characters!',
        type: 'error',
      };
      errors++;
    } else if (submited && !this.validatePassword(this.user.password)) {
      this.formMsg['password'] = {
        msg: 'Password must be between 8 to 64 characters!',
        type: 'error',
      };
      errors++;
    } else if (this.user.password != '') {
      this.formMsg['password'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['password'];
      errors++;
    }

    // gender
    if (submited && this.user.gender == '') {
      this.formMsg['gender'] = {
        msg: 'Please select your gender!',
        type: 'error',
      };
      errors++;
    } else if (this.user.gender != '') {
      this.formMsg['gender'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['gender'];
      errors++;
    }

    // age
    if (
      !submited &&
      this.user.age != null &&
      !this.validateAge(this.user.age)
    ) {
      this.formMsg['age'] = {
        msg: 'Age must be between 10 to 150 years!',
        type: 'error',
      };
      errors++;
    } else if (submited && !this.validateAge(this.user.age)) {
      this.formMsg['age'] = {
        msg: 'Age must be between 10 to 150 years!',
        type: 'error',
      };
      errors++;
    } else if (this.user.age != null) {
      this.formMsg['age'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['age'];
      errors++;
    }

    // image
    if (
      !submited &&
      this.user.profileImage != null &&
      !this.validateImage(this.user.profileImage)
    ) {
      this.formMsg['image'] = {
        msg: 'Please add your profile photo! (.png, .jpg, .jpeg)',
        type: 'error',
      };
      errors++;
    } else if (submited && !this.validateImage(this.user.profileImage)) {
      this.formMsg['image'] = {
        msg: 'Please add your profile photo! (.png, .jpg, .jpeg)',
        type: 'error',
      };
      errors++;
    } else if (this.user.profileImage != null) {
      this.formMsg['image'] = {
        msg: 'Looks good!',
        type: 'sucess',
      };
    } else {
      delete this.formMsg['image'];
      errors++;
    }

    // numbers
    for (let i = 0; i < this.user.phone.length; i++) {
      const phone = this.user.phone[i].number;

      if (!submited && phone != '' && !this.validatePhone(phone)) {
        this.formMsg[`phone_${i}`] = {
          msg: 'Please add a valid phone number',
          type: 'error',
        };
        errors++;
      } else if (submited && !this.validatePhone(phone)) {
        this.formMsg[`phone_${i}`] = {
          msg: 'Please add a valid phone number',
          type: 'error',
        };
        errors++;
      } else if (phone != '') {
        this.formMsg[`phone_${i}`] = {
          msg: 'Looks good!',
          type: 'sucess',
        };
      } else {
        delete this.formMsg[`phone_${i}`];
        errors++;
      }
    }

    // addresses
    for (let i = 0; i < this.user.address.length; i++) {
      const address = this.user.address[i].address;

      if (!submited && address != '' && !this.validateAddress(address)) {
        this.formMsg[`address_${i}`] = {
          msg: 'Address must be between 3 to 256 characters!',
          type: 'error',
        };
        errors++;
      } else if (submited && !this.validateAddress(address)) {
        this.formMsg[`address_${i}`] = {
          msg: 'Address must be between 3 to 256 characters!',
          type: 'error',
        };
        errors++;
      } else if (address != '') {
        this.formMsg[`address_${i}`] = {
          msg: 'Looks good!',
          type: 'sucess',
        };
      } else {
        delete this.formMsg[`address_${i}`];
        errors++;
      }
    }

    return errors == 0;
  }

  toggleEnlargeImage() {
    this.enlargeImageVisible = !this.enlargeImageVisible;
  }

  addMobile() {
    if (this.user.phone.length < this.MaxPhone) {
      this.user.phone.push({ number: '' });
    }
  }

  addAddress() {
    if (this.user.address.length < this.MaxAddress) {
      this.user.address.push({ address: '' });
    }
  }

  removeMobile(index: number) {
    this.user.phone.splice(index, 1);
  }

  removeAddress(index: number) {
    this.user.address.splice(index, 1);
  }

  /* Validatoes Fuctions */
  validateName(name: string): boolean {
    if (!name) return false;
    return name.length >= 3 && name.length <= 100;
  }

  validateEmail(email: string): boolean {
    if (!email) return false;
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  validatePassword(password: string): boolean {
    if (!password) return false;
    return password.length >= 8 && password.length <= 64;
  }

  validateAge(age: number | null): boolean {
    if (!age) return false;
    return age >= 10 && age <= 150;
  }

  validateImage(image: File | null): boolean {
    if (image && (image + '').startsWith('uploads\\')) return true;

    return ['image/png', 'image/gif', 'image/jpeg'].includes(image?.type ?? '');
  }

  validatePhone(phone: string): boolean {
    const re = /^(\+?2?)?(01[0125])\d{8}$/;
    return re.test(phone);
  }

  validateAddress(address: string): boolean {
    if (!address) return false;
    return address.length >= 3 && address.length <= 256;
  }
}
