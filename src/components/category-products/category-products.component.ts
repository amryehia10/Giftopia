import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductService],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  products: ProductModel[] = [];

  constructor(private router: ActivatedRoute, private service: ProductService) { }

  ngOnInit(): void {
    this.service.getProductsByCategory(this.router.snapshot.params["name"]).subscribe({
      next: (data) => this.products = GeneralMethods.CastProducts(data), 
      error: (error) => console.error('There was an error!', error)
    });
  }

  sortByPrice() {

  }
}
