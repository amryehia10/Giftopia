import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../components/login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../components/register/register.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent, LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Giftopia';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    console.log('Current route:', this.router.url);
    var pageLogin = this.router.url === '/login' || this.router.url === '/register';
    return pageLogin;
  }
  
}
