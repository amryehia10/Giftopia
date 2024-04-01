import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { SideBarCartComponent } from '../side-bar-cart/side-bar-cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CartComponent,
    SideBarCartComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // isSidebarVisible: boolean = false;

  // openSidebar() {
  //   this.isSidebarVisible = !this.isSidebarVisible;
    
  //   console.log(this.isSidebarVisible);
  // }


  isSidebarVisible: boolean = false;

  openSidebar() {
    this.isSidebarVisible = true;
  }

  onCloseSidebar() {
    this.isSidebarVisible = false;
  }

}
