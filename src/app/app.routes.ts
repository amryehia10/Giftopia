import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DiscoverAllComponent } from '../components/discover-all/discover-all.component';
import { ProductComponent } from '../components/product/product.component';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'discoverAll', component:DiscoverAllComponent},
    {path: 'products/:id', component:ProductComponent},
    {path: 'categories/:id',component:CategoryProductsComponent},
    {path: 'about',component:AboutUsComponent},
];
