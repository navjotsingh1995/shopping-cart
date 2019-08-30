import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map} from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  data: number | Promise<void>;
  shoppingCartItemCount: number;

  constructor(private db: AngularFireDatabase) {
  
   }

 private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

 async getCart():Promise<AngularFireObject<ShoppingCart>>{
   let cartId= await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId:any,productId:string){
    return this.db.object('/shopping-carts/' + cartId   + '/items/' + productId);
  }

private async getOrCreateCartId():Promise<string>{
  let cartId= localStorage.getItem('cartId');
  if(cartId) return cartId;
  let result = await this.create();
  localStorage.setItem('cartId',result.key);
  return result.key;
}

async addToCart(product: Product){
  this.updateItemQuantity(product,1);
}

async removeFromCart(product:Product){
this.updateItemQuantity(product,-1)
}

private async updateItemQuantity(product:Product,change:number){
  let obj;
  let cartId= await this.getOrCreateCartId();
  let item$ = this.getItem(cartId,product.key)
  item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
       if(item.payload.toJSON() == null) obj = {'product':product , 'quantity':1};
      else obj  = {'product':product,'quantity':item.payload.toJSON().quantity + change};
      item$.update(obj);

    })
}



}
