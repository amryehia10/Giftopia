import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { SideBarCartComponent } from '../side-bar-cart/side-bar-cart.component';
import { SideBarCategoryComponent } from '../side-bar-category/side-bar-category.component';
import { SideBarWishlistComponent } from '../side-bar-wishlist/side-bar-wishlist.component';
import { SideBarMenuComponent } from '../side-bar-menu/side-bar-menu.component';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    CartComponent,
    SideBarCartComponent,
    SideBarCategoryComponent,
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

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.service
      .getAllCategories()
      .subscribe({
        next: (data) => (this.Categories = GeneralMethods.CastCategories(data)),
        error: (error) => console.log(error)

      });
  }

  openCartSidebar() {
    this.isCartSidebarVisible = true;
  }

  onCloseCartSidebar() {
    this.isCartSidebarVisible = false;
  }

  openCategorySidebar() {
    this.isCategorySidebarVisible = true;
  }

  onCloseCategorySidebar() {
    this.isCategorySidebarVisible = false;
  }

  openWishlistSidebar() {
    this.isWishlistSidebarVisible = true;
  }

  onCloseWishlistSidebar() {
    this.isWishlistSidebarVisible = false;
  }

  togelMenuSideBar() {
    this.isMenuSideBarVisible = !this.isMenuSideBarVisible;
  }
}
