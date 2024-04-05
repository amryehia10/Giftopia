import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { CartService } from '../../services/cart.service';
import { GeneralMethods } from '../../functions';

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
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private CartService: CartService) { }

  ngOnInit(): void {
    this.CartService.getAllAtCartByUserId('user123').subscribe({
      next: (data) => console.log(data),
      // next: (data) => this.cartItems = GeneralMethods.CastCartItems(data),
      error: (error) => console.error(error)
    });
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

}
