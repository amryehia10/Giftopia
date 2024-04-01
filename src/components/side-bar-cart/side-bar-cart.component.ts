import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar-cart',
  standalone: true,
  imports: [],
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
