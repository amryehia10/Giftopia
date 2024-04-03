import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DiscoverAllComponent } from '../components/discover-all/discover-all.component';
import { ProductComponent } from '../components/product/product.component';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { LoginComponent } from '../components/login/login.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { TermsConditionsComponent } from '../components/terms-conditions/terms-conditions.component';
import { TrackOrderComponent } from '../components/track-order/track-order.component';
import { CartComponent } from '../components/cart/cart.component';
import { RegisterComponent } from '../components/register/register.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { CategoryPageComponent } from '../pages/category-page/category-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:name', component: CategoryProductsComponent },
  { path: 'discoverAll', component: DiscoverAllComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'home/products/:id', component: ProductComponent },
  { path: 'category', component: CategoryPageComponent },
  { path: 'category/:name', component: CategoryProductsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'terms-condition', component: TermsConditionsComponent },
  // {path: ':name',component:CategoryProductsComponent},/** any data goto same page */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
