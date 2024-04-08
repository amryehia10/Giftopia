import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { styleItemsDirective } from '../../directives/styleItems.directive';
import { of } from 'rxjs';
import { GeneralMethods } from '../../functions';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-discover-items',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, styleItemsDirective],
  providers: [ProductService, CategoryService],
  templateUrl: './discover-items.component.html',
  styleUrl: './discover-items.component.css'
})
export class DiscoverItemsComponent implements OnInit {
  catNames: string[] = [];
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];
  firstprdList: ProductModel[] = [];
  secondprdList: ProductModel[] = [];
  constructor(private prdService: ProductService, private catService: CategoryService) { }

  ngOnInit(): void {
    this.catService.getCategory().subscribe({
      next: async (data) => {
        this.categories = await GeneralMethods.CastCategories(data);
        this.populatecatNames();  

        this.prdService.getAllProducts().subscribe({
          next: (data) => {
            this.products = GeneralMethods.CastProducts(data);
            this.getProductsOfCat();
          },
          error: (err) => console.log(err)
        });
      },
      error: (err) => console.log(err)
    });
  }
  

  populatecatNames(): void {
    for (let i = 0; i < 2; i++) { 
      this.catNames.push(this.categories[i].name);
    }
  }

  getProductsOfCat() {
    let counter = 0;
    for (let prd of this.products) {
      if (this.catNames[0].toLowerCase() == prd.cat[0].toLowerCase() && counter < 8 && prd.discount > 0) { 
        this.firstprdList.push(prd);
        counter++; 
      }
    }

    counter = 0;

    for (let prd of this.products) {
      if (this.catNames[1].toLowerCase() == prd.cat[0].toLowerCase() && counter < 8  && prd.discount > 0) { 
        this.secondprdList.push(prd); 
        counter++;
      }
    }
  }
}
