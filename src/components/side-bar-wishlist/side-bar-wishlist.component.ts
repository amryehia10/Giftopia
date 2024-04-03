import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-wishlist.component.html',
  styleUrl: './side-bar-wishlist.component.css'
})
export class SideBarWishlistComponent {
  @Input() isWishlistSidebarVisible: boolean = false;
  @Output() closeWishlistSidebar = new EventEmitter<void>();

  onCloseWishlistSidebar() {
    this.closeWishlistSidebar.emit();

    console.log("onCloseWishlistSidebar");
  }
}
