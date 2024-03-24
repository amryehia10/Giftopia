import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit{
  cats:any;
  ngOnInit(): void {
    
  }

}
