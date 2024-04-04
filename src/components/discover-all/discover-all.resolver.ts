import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { combineLatest, map, tap } from 'rxjs';
import { GeneralMethods } from '../../functions';
import { DiscoverAllService } from './discover-all.service';

export const discoverAllResolver: ResolveFn<boolean> = (route, state) => {
  const productService = inject(DiscoverAllService);
  return productService.getData().pipe(map(()=>true))
}; 