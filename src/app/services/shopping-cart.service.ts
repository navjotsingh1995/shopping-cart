import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ThrowStmt } from '@angular/compiler';
import { Product } from '../models/product';
import { take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

 private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

 async getCart(){
   let cartId= await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
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
  let cartId= await this.getOrCreateCartId();
  let item$ = this.getItem(cartId,product.key)
  item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
    // if(item.payload.exists()){
      item$.update({quantity:(item.payload.toJSON().quantity || 0) + 1})
        // }else{
        //   item$.set({product:product,quantity:1});
        // }
    })
}

}
