import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductsService],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  products: any;

  constructor(private router: ActivatedRoute, private service: ProductsService) { }

  ngOnInit(): void {
    this.service.getProductsByCategory(this.router.snapshot.params["name"]).subscribe({
      next: (data) => this.products = GeneralMethods.CastProducts(data),
      error: (error) => console.error('There was an error!', error)
    });
  }





  sortByPrice() {

  }
}
