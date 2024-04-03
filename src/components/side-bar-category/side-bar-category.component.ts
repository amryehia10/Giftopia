import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-category',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-category.component.html',
  styleUrl: './side-bar-category.component.css'
})
export class SideBarCategoryComponent {
  @Input() isCategorySidebarVisible: boolean = false;
  @Output() closeCategorySidebar = new EventEmitter<void>();

  onCloseCategorySidebar() {
    this.closeCategorySidebar.emit();
  }
}
