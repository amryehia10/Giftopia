import { Component, OnInit } from '@angular/core';
import { CatProductsService } from '../../services/cat-products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [HttpClientModule],
  providers: [CatProductsService, ProductsService],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  products: any;

  constructor(private router: ActivatedRoute, private service: ProductsService/*CatProductsService*/) { }

  ngOnInit(): void {
    // this.service.getCategoryProducts("5").subscribe({next:(data)=>{console.log(data)}});
    const catName = this.router.snapshot.params["name"];
    console.log(catName);
    this.service.getproducts().subscribe({
      next: (data) => {
        console.log(typeof data);
        this.products = data;//.filter(prd => prd.cat.includes("accessories"));      
          console.log(  this.products);

      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  



  sortByPrice() {

  }
}
