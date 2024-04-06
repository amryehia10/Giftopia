import { ActivatedRoute } from '@angular/router';
import { GeneralMethods } from '../../functions';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers: [ProductService],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  btnSortToggle = "Low to High";
  products: ProductModel[] = [];

  constructor(private router: ActivatedRoute, private service: ProductService, private CartService: CartService) { }

  ngOnInit(): void {
    this.service.getProductsByCategory(this.router.snapshot.params["name"]).subscribe({
      next: (data) => this.products = GeneralMethods.CastProducts(data),
      error: (error) => console.error(error)
    });
  }

  toggleSort() {
    if (this.btnSortToggle === "Low to High") {
      this.products.sort((a, b) => (a.price * (1-(a.discount/100))) - (b.price * (1-(b.discount/100))));
      this.btnSortToggle = "High to Low";
    } else {
      this.products.sort((a, b) => (b.price * (1-(b.discount/100))) - (a.price * (1-(a.discount/100))) );
      this.btnSortToggle = "Low to High";
    }
  }

  async addToCart(product: ProductModel) {
    console.log(product);

    let productToAdd = {
      userId: 'user123',
      productId: [product._id],
      quantity: [1],
      total: 1
    };

    if(product.quantity > 0) {
      var result = await this.CartService.addToCart('user123', productToAdd);

      // result.forEach((value) => console.log(value));
      // console.log('-------------------------------------');
      // console.log(productToAdd);
      
    }else {
      console.log('Product quantity is 0');
    }
  }

}
