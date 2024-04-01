import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { SideBarCartComponent } from '../side-bar-cart/side-bar-cart.component';
import { SideBarCategoryComponent } from '../side-bar-category/side-bar-category.component';
import { SideBarWishlistComponent } from '../side-bar-wishlist/side-bar-wishlist.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CartComponent,
    SideBarCartComponent,
    SideBarCategoryComponent,
    SideBarWishlistComponent,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isCartSidebarVisible: boolean = false;
  isCategorySidebarVisible: boolean = false;
  isWishlistSidebarVisible: boolean = false;

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

  openWishlistSidebar() {
    this.isWishlistSidebarVisible = true;
    console.log("open wishlist");
  }

  onCloseWishlistSidebar() {
    this.isWishlistSidebarVisible = false;
  }

}
