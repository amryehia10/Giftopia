// import { Component, Input, Output } from '@angular/core';

// @Component({
//   selector: 'app-side-bar-cart',
//   standalone: true,
//   imports: [],
//   templateUrl: './side-bar-cart.component.html',
//   styleUrl: './side-bar-cart.component.css'
// })
// export class SideBarCartComponent {
//   @Input() isSidebarVisible: boolean = false;

//   closeSidebar() {
//     this.isSidebarVisible = false;
//   }

// }



import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar-cart',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-cart.component.html',
  styleUrl: './side-bar-cart.component.css'
})
export class SideBarCartComponent {
  @Input() isSidebarVisible: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();

  onCloseSidebar() {
    this.closeSidebar.emit();
  }
}
