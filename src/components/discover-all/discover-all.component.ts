import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-discover-all',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, CategoryService],
  templateUrl: './discover-all.component.html',
  styleUrl: './discover-all.component.css'
})
export class DiscoverAllComponent implements OnInit  {
  products: any;
  categories: any;
  catNames: string[] = [];
  discoveredProducts: {id:number, name: string, price:number, desc:string, cat:number, images: { url: string }[], discount:number}[] = [];
  constructor(private prdService:ProductService, private catService: CategoryService) {}

  ngOnInit() { 
    this.prdService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.getDiscoveredProducts()
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.catService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
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