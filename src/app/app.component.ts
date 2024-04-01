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
import { SideBarCategoryComponent } from '../components/side-bar-category/side-bar-category.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';

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
    SideBarCategoryComponent,
    PrivacyPolicyComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Giftopia';

  constructor(private router: Router) { }

  isLoginPage(): boolean {
    console.log('Current route:', this.router.url);
    var pageLogin = this.router.url === '/login' || this.router.url === '/register';
    return pageLogin;
  }

}
