import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {
  newProducts: any[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getRecentProducts();
  }

  getRecentProducts(): void {
    this.productService.getproducts().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          this.newProducts = data.filter((product: any) => {
            return new Date(product.createdAt) >= twoWeeksAgo;
          });
        } else {
          console.error('Received data is not an array:', data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
