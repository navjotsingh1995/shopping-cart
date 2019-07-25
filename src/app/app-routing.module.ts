import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { AdminProductsComponent } from './component/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './component/admin/admin-orders/admin-orders.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [

  {path:'',component: HomeComponent},
  {path:'products',component: ProductsComponent},
  {path:'my-orders',component: MyOrdersComponent},
  {path:'shopping-cart',component: ShoppingCartComponent},
  {path:'check-out',component: CheckOutComponent},
  {path:'order-success',component: OrderSuccessComponent},
  {path:'login',component: LoginComponent},
  {path:'admin/products',component: AdminProductsComponent},
  {path:'admin/orders',component: AdminOrdersComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
