import { ActivatedRoute } from '@angular/router';
import { GeneralMethods } from '../../functions';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { firstValueFrom } from 'rxjs';

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
  // oldCartProducts = [];
  cartProducts: {productId: string, soldQuantity: number}[] = [];

  products: ProductModel[] = [];

  constructor(private router: ActivatedRoute, private service: ProductService, private CartService: CartService) {   }

  ngOnInit(): void {
    this.service.getProductsByCategory(this.router.snapshot.params["name"]).subscribe({
      next: (data) => this.products = GeneralMethods.CastProducts(data),
      error: (error) => console.error(error)
    });

    //get old cart products
    this.getUsersOldCartProducts();
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

  async getUsersOldCartProducts() : Promise<void> {
    const userId = '6613da0131e67deca8b6c269'; 

    try {
      const data = await firstValueFrom(
        this.CartService.getUserCart(userId)
      );
      console.log(data);
      
      this.cartProducts = data["data"][0]["products"].map((item: any) => ({
        productId: item._id,
        soldQuantity: item.soldQuantity
      }));

      console.log('old',this.cartProducts);
      
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
    
    // await this.CartService.getUserCart(userId).subscribe({
    //   next: (response) => {
    //     if (response.status === 'success') {
    //       console.log(response);
          
    //       this.oldCartProducts = response.data.products;
    //       console.log('old', this.oldCartProducts);
          
    //     } else {
    //       console.error('Failed to get user cart:', response);
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error fetching user cart:', error);
    //   }
    // });
  }

  async updateCartProducts(product: ProductModel):Promise<void> {
    console.log(product);

    this.cartProducts.push({
      productId: product._id,
      soldQuantity: 2
    });

    let newCart = {
      userId: '6613da0131e67deca8b6c269',
      items: this.cartProducts
    };

    if(product.quantity > 0) {
      var result = await this.CartService.updateCartProducts(newCart);

      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      console.log(newCart);
      
    }else {
      console.log('Product quantity is 0');
    }
  }



}
