import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-cart',
  standalone: true,
  imports: [
    RouterModule,
    CartComponent,
    CheckoutComponent
  ],
  templateUrl: './side-bar-cart.component.html',
  styleUrl: './side-bar-cart.component.css'
})
export class SideBarCartComponent {
  @Input() isCartSidebarVisible: boolean = false;
  @Output() closeCartSidebar = new EventEmitter<void>();

  onCloseCartSidebar() {
    this.closeCartSidebar.emit();

    console.log("onCloseCartSidebar");
  }
}
