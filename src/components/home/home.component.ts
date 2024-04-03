import { Component } from '@angular/core';
import { AdvertCategoriesComponent } from '../advert-categories/advert-categories.component';
import { DiscoverItemsComponent } from '../discover-items/discover-items.component';
import { OurServicesComponent } from '../our-services/our-services.component';
import { NewProductsComponent } from '../new-products/new-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DiscoverItemsComponent,
    AdvertCategoriesComponent,
    NewProductsComponent,
    OurServicesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
