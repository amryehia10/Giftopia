import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-discover-all',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, CategoryService],
  templateUrl: './discover-all.component.html',
  styleUrl: './discover-all.component.css'
})
export class DiscoverAllComponent implements OnInit {
  catNames: string[] = [];
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];
  discoveredProducts: ProductModel[] = [];
  constructor(private prdService: ProductService, private catService: CategoryService) { }

  async ngOnInit() {
    this.prdService.getAllProducts().subscribe({
      next: (data) => {
        this.products = GeneralMethods.CastProducts(data);
        this.getDiscoveredProducts()
      },
      error: (err) => console.log(err)
    })

    this.catService.getCategory().subscribe({
      next: (data) => {
        this.categories = GeneralMethods.CastCategories(data);
        this.populatecatNames();
        this.getDiscoveredProducts();
      },
      error: (err) => console.log(err)
    })
  }

  populatecatNames(): void {
    for (let cat of this.categories) {
      this.catNames.push(cat.name);
    }
  }

  getDiscoveredProducts() {
    if (!this.products || !this.categories || this.catNames.length === 0) {
      return;
    }

    this.products.sort((a: any, b: any) => {
      const discountA = parseInt(a.discount);
      const discountB = parseInt(b.discount);
      return discountB - discountA;
    });
    
    let counter = 0;
    for (let cat = 0; cat < this.catNames.length; cat++) {
      for (let prd of this.products) {
        if (this.catNames[cat].toLowerCase() == prd.cat[0].toLowerCase() && counter < 8) {
          counter++;
          prd.discount = prd.discount / 100;
          this.discoveredProducts.push(prd);
        }
      }
      counter = 0;
    }
  }
}