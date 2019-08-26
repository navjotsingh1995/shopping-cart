import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ThrowStmt } from '@angular/compiler';
import { Product } from '../models/product';
import { take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  data: any;

  constructor(private db: AngularFireDatabase) { }

 private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId:string){
    return this.db.object('/shopping-carts/' + cartId)
  }

private async getOrCreateCartId(){
  let cartId= localStorage.getItem('cartId');
  if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return this.getCart(result.key);
}

async addToCart(product: Product){
  let cartId= await this.getOrCreateCartId();
  let item$ = this.db.object('/shopping-carts/' + cartId   + '/items/' + product.key);
  item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
    if(item.payload.exists()){
     this.data= item$.update({quantity:item.payload.toJSON().quantity + 1})
        }else{
          item$.set({product:product,quantity:1});
        }
    })
}

}
