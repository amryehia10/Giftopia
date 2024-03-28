import { Component, OnInit } from '@angular/core';
import { CatProductsService } from '../../services/cat-products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [HttpClientModule],
  providers:[CatProductsService, ProductsService],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit{
  products:any;
  
  constructor(private service:ProductsService/*CatProductsService*/){}

  ngOnInit(): void {
    // this.service.getCategoryProducts("5").subscribe({next:(data)=>{console.log(data)}});
    this.service.getproducts().subscribe({next:(data)=>{console.log(data); this.products = data}})
  }
  sortByPrice(){

  }
}
