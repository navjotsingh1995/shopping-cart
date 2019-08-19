import { AuthGuardService } from './services/auth-guard.service';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { AdminProductsComponent } from './component/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './component/admin/admin-orders/admin-orders.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { LoginComponent } from './component/login/login.component';
import { AdminAuthGuardService } from './services/admin-auth/admin-auth-guard.service';
import { ProductFormComponent } from './component/admin/product-form/product-form.component';

const routes: Routes = [

  {path:'',component: ProductsComponent},
  {path:'products',component: ProductsComponent},
  {path:'shopping-cart',component: ShoppingCartComponent},
  {path:'login',component: LoginComponent},
  {path:'my-orders',component: MyOrdersComponent, canActivate:[AuthGuardService]},
  {path:'check-out',component: CheckOutComponent, canActivate:[AuthGuardService]},
  {path:'order-success',component: OrderSuccessComponent, canActivate:[AuthGuardService]},
  {path:'admin/orders',component: AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path:'admin/products/:id',component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path:'admin/products/new/product',component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
  {path:'admin/products',component: AdminProductsComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
