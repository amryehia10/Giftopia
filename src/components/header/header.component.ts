import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { SideBarCartComponent } from '../side-bar-cart/side-bar-cart.component';
import { SideBarCategoryComponent } from '../side-bar-category/side-bar-category.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CartComponent,
    SideBarCartComponent,
    SideBarCategoryComponent,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isCartSidebarVisible: boolean = false;
  isCategorySidebarVisible: boolean = false;

  openCartSidebar() {
    this.isCartSidebarVisible = true;
    console.log("open cart");
  }

  onCloseCartSidebar() {
    this.isCartSidebarVisible = false;
  }

  openCategorySidebar() {
    this.isCategorySidebarVisible = true;
    console.log("open category");
  }

  onCloseCategorySidebar() {
    this.isCategorySidebarVisible = false;
  }

}
