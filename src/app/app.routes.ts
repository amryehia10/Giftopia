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
import { PaymentMethodComponent } from '../components/payment-method/payment-method.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { NewProductsComponent } from '../components/new-products/new-products.component';
import { discoverAllResolver } from '../components/discover-all/discover-all.resolver';
import { LogoutComponent } from '../components/logout/logout.component';
import { ProfileComponent } from '../components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/category/:name', component: CategoryProductsComponent },
  {
    path: 'discoverAll',
    component: DiscoverAllComponent,
    resolve: { data: discoverAllResolver },
  },
  { path: 'products/:id', component: ProductComponent },
  { path: 'home/products/:id', component: ProductComponent },
  { path: 'category/:name', component: CategoryProductsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'terms-condition', component: TermsConditionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'track-order', component: TrackOrderComponent },
  { path: 'track-order?:text', component: TrackOrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment-method', component: PaymentMethodComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'new-products', component: NewProductsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update', component: ProfileComponent },
  { path: 'delete', component: ProfileComponent }
];
