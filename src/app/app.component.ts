import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../components/login/login.component';
import { CommonModule } from '@angular/common';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { CartComponent } from '../components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    HomeComponent, 
    FooterComponent, 
    LoginComponent, 
    CommonModule,
    CategoryProductsComponent,
    CartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Giftopia';

  constructor(private router: Router) { }

  isLoginPage(): boolean {
    // console.log('Current route:', this.router.url);
    return this.router.url === '/login';
  }

}
