import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent implements OnInit{
  relatedProducts: ProductModel[] = [];
  product: ProductModel = {
    _id: "",
    desc: "",
    name: "",
    star: 0,
    price: 0,
    quantity: 0,
    discount: 0,
    numberOfSellings: 0,
    numberOfRates: 0,
    cat: [""],
    images: [""],
    createdAt: ""
}

  constructor(
    private route: ActivatedRoute,
    private prdService: ProductService,
  ) { }

  ngOnInit(): void {
    const prdID = String(this.route.snapshot.paramMap.get('id'));
    this.prdService.getProductByID(prdID).subscribe({
      next: (data) => {
        this.product = GeneralMethods.CastSingleProduct(data);
        this.prdService.getProductsByCategory(this.product.cat[0]).subscribe({
          next:(data) => {
            this.relatedProducts = GeneralMethods.CastProducts(data);
            for (let i=0;i<this.relatedProducts.length;i++){
              if (this.relatedProducts[i]._id == prdID){
                this.relatedProducts.splice(i,1);
                break;
              }
            }
          }
        })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  refreshPage() {
    window.location.reload();
  }
}
