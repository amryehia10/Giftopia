import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { WishListService } from '../../services/wish-list.service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-wishlist',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-bar-wishlist.component.html',
  styleUrl: './side-bar-wishlist.component.css'
})
export class SideBarWishlistComponent implements OnInit, OnChanges {
  @Input() isWishlistSidebarVisible: boolean = false;
  @Output() closeWishlistSidebar = new EventEmitter<void>();
  wishListItems: any[] = [];
  newWishListProducts: string[] = [];
  cartProducts: { productId: string; soldQuantity: number }[] = [];

  constructor(private productService: ProductService, private authService: AuthService, private wishListService: WishListService, private cartService: CartService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isWishlistSidebarVisible'] && !changes['isWishlistSidebarVisible'].firstChange) {
      if (this.isWishlistSidebarVisible) {
        this.loadWishlist();
      }
    }
  }

  ngOnInit(): void {
    if (this.isWishlistSidebarVisible) {
      this.loadWishlist();
    }
  }

  async loadWishlist(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id); 
    try {
      const data = await firstValueFrom(this.wishListService.getUserWishlist(userId));
      if(data.status != 'failed') {
        this.wishListItems = data.data[0].products.map((item: any) => ({
          _id: item._id,
          name: item.name ,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          discount: item.discount,
          soldQuantity: item.soldQuantity
        }));
        this.newWishListProducts = data.data[0].products.map((item: any) => (item._id))
      } 
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    }
    this.getUsersOldCartProducts()
  }

  onCloseWishlistSidebar(): void {
    this.closeWishlistSidebar.emit();
    console.log("onCloseWishlistSidebar");
  }

  async removeFromWishList(product: any, $event: any): Promise<void> {
    console.log(product);

    //hide product
    const li = $event.target.closest('li');
    li.style.display = 'none';

    //remove product from cart
    this.newWishListProducts = this.newWishListProducts.filter(item => item !== product._id);

    let newWishList = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.newWishListProducts
    };

    if(product.quantity > 0) {
      var result = await this.wishListService.updateWishlist(newWishList);

      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      console.log(newWishList);
      
    }else {
      console.log('Product quantity is 0');
    }
  }

  async getUsersOldCartProducts(): Promise<void> {
    const userId = String(this.authService.getCurrentUser()?._id);

    try {
      const data = await firstValueFrom(this.cartService.getUserCart(userId));
      if(data.status != 'failed') {
        this.cartProducts = data['data'][0]['products'].map((item: any) => ({
          productId: item._id,
          soldQuantity: item.soldQuantity,
        }));
      }
      console.log('old', this.cartProducts);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  }


  async updateCartProducts(product: ProductModel): Promise<void> {
    const hasProductId = this.cartProducts.findIndex(item => item.productId === product._id);
    let prdQuantity = 0;
    if(hasProductId != -1) {
      prdQuantity = this.cartProducts.find(item => item.productId === product._id)!.soldQuantity;
      this.cartProducts[hasProductId] = {productId: product._id, soldQuantity: 1 + prdQuantity,};
    } else {
      this.cartProducts.push({
        productId: product._id,
        soldQuantity: 1
      });
    }
    console.log(this.cartProducts)

    let newCart = {
      userId: String(this.authService.getCurrentUser()?._id),
      items: this.cartProducts,
    };

    if (product.quantity > 0) {
      var result = await this.cartService.updateCartProducts(newCart);
      console.log(result)
      result.forEach((value) => console.log(value));
      console.log('-------------------------------------');
      // console.log(newCart);
    } else {
      console.log('Product quantity is 0');
    }
  }
}

