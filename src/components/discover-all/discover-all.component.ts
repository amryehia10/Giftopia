import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { GeneralMethods } from '../../functions';
import { catchError, combineLatest, map } from 'rxjs';
import { DiscoverAllService } from './discover-all.service';
import { CartProductService } from '../../services/cart-product.service';

@Component({
  selector: 'app-discover-all',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, CategoryService,HttpClientModule],
  templateUrl: './discover-all.component.html',
  styleUrl: './discover-all.component.css'
})

export class DiscoverAllComponent {  
  constructor(public service:DiscoverAllService, private cartProductService: CartProductService){}
  
  public get categories(){
    return this.service.categories.value 
  }
  
  public get discoveredProducts() {
    return this.service.discoveredProducts.value
  }

  addToCart(prdId: string) {
    this.cartProductService.sendProductId(prdId);
  }
}