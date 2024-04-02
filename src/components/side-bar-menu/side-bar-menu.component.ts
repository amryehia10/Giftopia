import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-menu.component.html',
  styleUrl: './side-bar-menu.component.css',
})
export class SideBarMenuComponent {
  @Input() isMenuSideBarVisible: boolean = false;
  @Output() closeMenuSideBar = new EventEmitter<void>();

  onCloseMenuSideBar() {
    this.closeMenuSideBar.emit();
  }
}
