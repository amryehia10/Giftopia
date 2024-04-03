import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GeneralMethods } from '../../functions';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ProductService],
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {
  Products: ProductModel[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next: (data) => {
        this.Products = GeneralMethods.CastProducts(data);
        // if (Array.isArray(data)) {
        //   const twoWeeksAgo = new Date();
        //   twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        //   this.newProducts = data.filter((product: any) => {
        //     return new Date(product.createdAt) >= twoWeeksAgo;
        //   });
        // } else {
        //   console.error('Received data is not an array:', data);
        // }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
