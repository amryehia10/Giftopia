import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterModule,
    HomeComponent,
    PrivacyPolicyComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['home']);
  }

}
