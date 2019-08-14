import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  data: any;
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAll() {
    return this.db
      .list("/products")
     
  }

  get(productId) {
    return this.db.object("/products/" + productId);
  }

  update(productId, product){
  return this.db.object('/products/'+ productId).update(product);
  }

  delete(productId){
      return this.db.object('/products/'+ productId).remove();
  }
}
