import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';

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
  catID: number[] = [];
  constructor(private productService:ProductsService, private categoryService: CategoryService) {}

  ngOnInit() { 
    this.productService.getproducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.populateCatIDs();
        console.log(this.catID)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  populateCatIDs(): void {
    for (let cat of this.categories) {
      this.catID.push(cat.id);
    }
  }
}
