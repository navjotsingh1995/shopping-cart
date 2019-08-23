import { switchMap } from 'rxjs/operators';
import { Product } from './../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$:any=[];
  category:string;
  filteredProduct: Product[]=[]

  constructor(productService:ProductService,route:ActivatedRoute) {

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

  ngOnInit() {
  }

  trackByProduct(index, item){
      if(!item) return null;
      return index;
  }

}
