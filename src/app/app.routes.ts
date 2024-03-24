import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DiscoverAllComponent } from '../components/discover-all/discover-all.component';
import { ProductComponent } from '../components/product/product.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'discoverAll', component:DiscoverAllComponent},
    {path: 'product/:id', component:ProductComponent}
];
