import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-menu',
  standalone: true,
  imports: [RouterModule],
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
