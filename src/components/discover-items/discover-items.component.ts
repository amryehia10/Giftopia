import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { styleItemsDirective } from '../../directives/styleItems.directive';
import { of } from 'rxjs';

@Component({
  selector: 'app-discover-items',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, styleItemsDirective],
  providers: [ProductsService, CategoryService],
  templateUrl: './discover-items.component.html',
  styleUrl: './discover-items.component.css'
})
export class DiscoverItemsComponent implements OnInit {
  products: any;
  categories: any;
  catNames: string[] = [];
  firstprdList: {id:string, name: string, price:number, desc:string, cat:string[], img:string, discount:number}[] = [];
  secondprdList: {id:string, name: string, price:number, desc:string, cat:string[], img:string, discount:number}[] = [];
  constructor(private productService:ProductsService, private categoryService: CategoryService) {}

  ngOnInit(): void { 
    this.productService.getproducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.populatecatNamess();
        this.getProductsOfCat();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  populatecatNamess(): void {
    for (let i = 0; i < 2; i++) {
      this.catNames.push(this.categories[i].categoryName);
    }
  }

  getProductsOfCat() {
    let counter = 0; 
    for(let prd of this.products) {
      if(this.catNames[0] == prd.cat && counter < 8) {
        counter++;
        this.firstprdList.push(prd);
      }
    }
    
    counter = 0;

    for(let prd of this.products) {
      if(this.catNames[1] == prd.cat && counter < 8) {
        counter++;
        this.secondprdList.push(prd);
      }
    }
  }
}
