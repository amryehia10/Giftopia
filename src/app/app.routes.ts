import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DiscoverAllComponent } from '../components/discover-all/discover-all.component';
import { ProductComponent } from '../components/product/product.component';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { LoginComponent } from '../components/login/login.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { TermsConditionsComponent } from '../components/terms-conditions/terms-conditions.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'discoverAll', component:DiscoverAllComponent},
    {path: 'products/:id', component:ProductComponent},
    {path: 'categories/:id',component:CategoryProductsComponent},
    {path: 'about',component:AboutUsComponent},
    {path: 'contact',component:ContactUsComponent},
    {path: 'terms-condition',component:TermsConditionsComponent},
    {path: 'login',component:LoginComponent},
];
