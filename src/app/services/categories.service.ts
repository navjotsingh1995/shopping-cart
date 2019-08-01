import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  data: any;
  category:any;
  constructor(private db:AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories',ref=>ref.orderByChild('name'))
    // .snapshotChanges().pipe(map(res=>{
    //         res.forEach(res=>{
    //           this.category=res.key
              
    //         })
            
            
    // }));
  }


}
