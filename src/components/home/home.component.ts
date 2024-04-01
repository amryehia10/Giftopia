import { Component } from '@angular/core';
import { AdvertCategoriesComponent } from '../advert-categories/advert-categories.component';
import { DiscoverItemsComponent } from '../discover-items/discover-items.component';
import { OurServicesComponent } from '../our-services/our-services.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DiscoverItemsComponent,
    AdvertCategoriesComponent,
    OurServicesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
