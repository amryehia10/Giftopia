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
    this.prdService.getAllProducts().subscribe({
      next: (data) => this.products = GeneralMethods.CastProducts(data),
      error: (err) => console.log(err)
    });

    this.catService.getCategory().subscribe({
      next: (data) => {
        this.categories = GeneralMethods.CastCategories(data);
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
      this.catNames.push(this.categories[i].name);
    }
  }

  getProductsOfCat() {
    let counter = 0;
    for (let prd of this.products) {
      if (this.catNames[0] == prd.cat[0] && counter < 8) {
        counter++;
        this.firstprdList.push(prd);
      }
    }

    counter = 0;

    for (let prd of this.products) {
      if (this.catNames[1] == prd.cat[0] && counter < 8) {
        counter++;
        this.secondprdList.push(prd);
      }
    }
  }
}
