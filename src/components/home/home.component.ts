import { Component } from '@angular/core';
import { DiscoverItemsComponent } from '../discover-items/discover-items.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DiscoverItemsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
