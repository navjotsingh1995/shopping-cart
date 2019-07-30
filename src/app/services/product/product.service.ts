import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
   
    return this.db.list('/products').push(product);
  }

  getAll(){
   let q=this.db.list('/products').valueChanges();
   console.log(q);
   return q;
   
  }

  get(productId){
      return this.db.object('/products/' + productId);
  }
}
