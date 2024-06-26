import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../components/login/login.component';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { CartComponent } from '../components/cart/cart.component';
import { SideBarCartComponent } from '../components/side-bar-cart/side-bar-cart.component';
import { RegisterComponent } from '../components/register/register.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { OurServicesComponent } from '../components/our-services/our-services.component';
import { SideBarWishlistComponent } from '../components/side-bar-wishlist/side-bar-wishlist.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CommonModule,
    CategoryProductsComponent,
    CartComponent,
    CheckoutComponent,
    SideBarCartComponent,
    SideBarWishlistComponent,
    PrivacyPolicyComponent,
    OurServicesComponent,
    HttpClientModule
  ],
  providers:[HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Giftopia';

  constructor(private router: Router) { }

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
