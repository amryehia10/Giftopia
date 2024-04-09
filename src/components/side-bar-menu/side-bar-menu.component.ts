import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchBarComponent } from '../header/search-bar/search-bar.component';

@Component({
  selector: 'app-side-bar-menu',
  standalone: true,
  imports: [RouterModule, SearchBarComponent],
  templateUrl: './side-bar-menu.component.html',
  styleUrl: './side-bar-menu.component.css',
})
export class SideBarMenuComponent {
  @Input() isMenuSideBarVisible: boolean = false;
  @Output() closeMenuSideBar = new EventEmitter<void>();

  user: User;

  constructor(private authServise: AuthService) {
    this.user = authServise.getCurrentUser();
  }

  onCloseMenuSideBar() {
    this.closeMenuSideBar.emit();
  }
}
