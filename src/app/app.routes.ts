import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DiscoverAllComponent } from '../components/discover-all/discover-all.component';
import { ProductComponent } from '../components/product/product.component';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'discoverAll', component:DiscoverAllComponent},
    {path: 'product/:id', component:ProductComponent},
    {path: 'category/:id',component:CategoryProductsComponent},
    {path: 'about',component:AboutUsComponent},
    {path: 'login',component:LoginComponent},
];
