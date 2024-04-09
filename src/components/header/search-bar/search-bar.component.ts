import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { GeneralMethods } from '../../../functions';
import { CommonModule } from '@angular/common';
import { SearchBarResultComponent } from '../search-bar-result/search-bar-result.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, SearchBarResultComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = GeneralMethods.CastProducts(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onKeyDown(event: any) {
      if (event.key === 'Enter') {
        event.preventDefault();
      } 
    
  }

  getData(event:any) {
    if (!event.target.value) {
      this.filteredProducts = []
      return;
    }
    
    this.filteredProducts = this.products.filter(
      prd => prd?.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(this.filteredProducts)
  }

  emptyFilteredProducts() {
    this.filteredProducts = []; // Clear filteredProducts array
  }
}
