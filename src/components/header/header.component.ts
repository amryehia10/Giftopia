import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { SideBarCartComponent } from '../side-bar-cart/side-bar-cart.component';
import { SideBarWishlistComponent } from '../side-bar-wishlist/side-bar-wishlist.component';
import { SideBarMenuComponent } from '../side-bar-menu/side-bar-menu.component';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    CartComponent,
    SideBarCartComponent,
    SideBarWishlistComponent,
    SideBarMenuComponent,
  ],
  providers: [CategoryService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isCartSidebarVisible: boolean = false;
  isCategorySidebarVisible: boolean = false;
  isWishlistSidebarVisible: boolean = false;
  isMenuSideBarVisible: boolean = false;

  Categories: CategoryModel[] = [];

  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.service
      .getCategory()
      .subscribe({ 
        next: (data) => (this.Categories = GeneralMethods.CastCategories(data)), 
        error:(error)=> console.log(error) 
      });
  }

  openCartSidebar() {
    this.isCartSidebarVisible = true;
    document.body.classList.add('popup-open');
  }

  onCloseCartSidebar() {
    this.isCartSidebarVisible = false;
    document.body.classList.remove('popup-open');
  }

  openCategorySidebar() {
    this.isCategorySidebarVisible = true;
    document.body.classList.add('popup-open');
  }

  onCloseCategorySidebar() {
    this.isCategorySidebarVisible = false;
    document.body.classList.remove('popup-open');
  }

  openWishlistSidebar() {
    this.isWishlistSidebarVisible = true;
    document.body.classList.add('popup-open');
  }

  onCloseWishlistSidebar() {
    this.isWishlistSidebarVisible = false;
    document.body.classList.remove('popup-open');
  }

  togelMenuSideBar() {
    this.isMenuSideBarVisible = !this.isMenuSideBarVisible;
    if (this.isMenuSideBarVisible) document.body.classList.add('popup-open');
    else document.body.classList.remove('popup-open');
  }
}
