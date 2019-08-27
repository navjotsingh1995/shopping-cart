import { switchMap } from 'rxjs/operators';
import { Product } from './../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products$:any=[];
  category:string;
  filteredProduct: Product[]=[]
  cart:any;
  subscription:Subscription

  constructor(productService:ProductService,route:ActivatedRoute,private shoppingCartService:ShoppingCartService) {
    productService.getAll().snapshotChanges().pipe(switchMap(res=> {
      res.forEach((element)=>{

                let obj= {
                  key: element.key,...element.payload.val()
                }
               this.products$.push(obj);
      });
     return route.queryParamMap;
    })).subscribe(params=>{
      this.category= params.get('category');
      this.filteredProduct= (this.category) ? this.products$.filter(p=>p.category=== this.category): this.products$;
     })
   }

  async ngOnInit() {
   this.subscription=  (await this.shoppingCartService.getCart()).subscribe(cart=> this.cart= cart);

  }

  trackByProduct(index, item){
      if(!item) return null;
      return index;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
