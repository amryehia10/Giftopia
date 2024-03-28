import { Component } from '@angular/core';
import { DiscoverItemsComponent } from '../discover-items/discover-items.component';
import { AdvertCategoriesComponent } from '../advert-categories/advert-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DiscoverItemsComponent,AdvertCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
