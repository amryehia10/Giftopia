import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { styleItemsDirective } from '../../directives/styleItems.directive';
import { of } from 'rxjs';
import { GeneralMethods } from '../../functions';
import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-discover-items',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, styleItemsDirective],
  providers: [ProductsService, CategoryService],
  templateUrl: './discover-items.component.html',
  styleUrl: './discover-items.component.css'
})
export class DiscoverItemsComponent implements OnInit {
  catNames: string[] = [];
  products: ProductModel[] = [];
  categories: CategoryModel[] = [];
  firstprdList: ProductModel[] = [];
  secondprdList: ProductModel[] = [];

  constructor(private productService: ProductsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productService.getproducts().subscribe({
      next: (data) => this.products = GeneralMethods.CastProducts(data),
      error: (err) => console.log(err)
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = GeneralMethods.CastCategories(data);
        this.populatecatNamess();
        this.getProductsOfCat();
        // console.log("firstprdList")
        // console.log(this.firstprdList)
        // console.log("\n\n\n\n\n\n");
        // console.log("secondprdList")
        // console.log(this.secondprdList)
      },
      error: (err) => console.log(err)
    });
  }

  populatecatNamess(): void {
    for (let i = 0; i < 2; i++) {
      this.catNames.push(this.categories[i].name);
    }
  }

  getProductsOfCat() {
    let counter = 0;
    for (let prd of this.products) {
      if (this.catNames[0].toLowerCase() == prd.cat[0].toLowerCase() && counter < 8) {
        counter++;
        this.firstprdList.push(prd);
      }
    }
  
    counter = 0;

    for (let prd of this.products) {
      if (this.catNames[1].toLowerCase() == prd.cat[0].toLowerCase() && counter < 8) {
        counter++;
        this.secondprdList.push(prd);
      } 
    }
  
  }
}
