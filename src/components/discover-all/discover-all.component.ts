import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-discover-all',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductsService, CategoryService],
  templateUrl: './discover-all.component.html',
  styleUrl: './discover-all.component.css'
})
export class DiscoverAllComponent implements OnInit  {
  products: any;
  categories: any;
  catNames: string[] = [];
  discoveredProducts: {id:number, name: string, price:number, desc:string, cat:number, images: { url: string }[], discount:number}[] = [];
  constructor(private productService:ProductsService, private categoryService: CategoryService) {}

  ngOnInit() { 
    this.productService.getproducts().subscribe({
      next: (data) => {
        this.products = data;
        this.getDiscoveredProducts()
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = GeneralMethods.CastCategories(data);
        this.populatecatNames();
        this.getDiscoveredProducts();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  populatecatNames(): void {
    for (let cat of this.categories) {
      this.catNames.push(cat.categoryName);
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
    for(let cat = 0; cat < this.catNames.length; cat++) {
      for(let prd of this.products) {
        if(this.catNames[cat] == prd.cat && counter < 8){
          counter++;
          let discount = parseInt(prd.discount);
          prd.discount = discount / 100;
          this.discoveredProducts.push(prd);
        }
      }
      counter = 0;
    }
  }
}