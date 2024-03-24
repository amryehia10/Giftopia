import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discover-items',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ProductsService, CategoryService],
  templateUrl: './discover-items.component.html',
  styleUrl: './discover-items.component.css'
})
export class DiscoverItemsComponent implements OnInit {
  products: any;
  categories: any;
  catID: number[] = [];
  
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
    console.log(this.catID)

    
  }

  isAtCat() { 

  }

}
