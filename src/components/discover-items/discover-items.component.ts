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
  catID: number[] = [];
  firstprdList: {id:number, name: string, price:number, desc:string, cat:number, img:string}[] = [];
  secondprdList: {id:number, name: string, price:number, desc:string, cat:number, img:string}[] = [];
  thirdprdList: {id:number, name: string, price:number, desc:string, cat:number, img:string}[] = [];
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
        this.populateCatIDs();
        this.getProductsOfCat();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  populateCatIDs(): void {
    for (let i = 0; i < 3; i++) {
      this.catID.push(this.categories[i].categoryId);
    }
  }

  getProductsOfCat() {
    let counter = 0; 
    for(let prd of this.products) {
      if(this.catID[0] == prd.cat && counter < 5) {
        counter++;
        this.firstprdList.push(prd);
      }
    }
    
    counter = 0;

    for(let prd of this.products) {
      if(this.catID[1] == prd.cat && counter < 5) {
        counter++;
        this.secondprdList.push(prd);
      }
    }
    
    counter = 0;
    
    for(let prd of this.products) {
      if(this.catID[2] == prd.cat && counter < 5) {
        console.log(counter)
        this.thirdprdList.push(prd);
        counter++;
      }
    }
  }
}
