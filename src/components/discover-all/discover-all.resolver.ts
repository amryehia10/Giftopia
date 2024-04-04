import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { combineLatest, map, tap } from 'rxjs';
import { GeneralMethods } from '../../functions';

export const discoverAllResolver: ResolveFn<boolean> = (route, state) => {
  const productService = inject(ProductService);
  const catService = inject(CategoryService);

  return combineLatest([
    productService.getAllProducts(),
    catService.getCategory()
  ]).pipe(
    tap((data) => {
      // const [products, categories] =data
      console.log(data)
      // route.snapshot.data['products'] = GeneralMethods.CastProducts(products);
      // route.snapshot.data['categories'] = GeneralMethods.CastCategories(categories);
    }),
    map(()=>true)
  );
}; 