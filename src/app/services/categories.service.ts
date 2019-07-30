import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  data: any;

  constructor(private db:AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories',ref=>ref.orderByChild('name')).valueChanges();
  }


}
