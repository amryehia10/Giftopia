import { Component } from '@angular/core';
import { AdvertCategoriesComponent } from '../../components/advert-categories/advert-categories.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [AdvertCategoriesComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
})
export class CategoryPageComponent {}
