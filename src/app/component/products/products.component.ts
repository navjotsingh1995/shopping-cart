import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$:any=[];

  constructor(productService:ProductService) {

    productService.getAll().snapshotChanges().subscribe(res=> {
      res.forEach((element)=>{
  
                let obj= {
                  key: element.key,...element.payload.val()
                }
               this.products$.push(obj);             
      });
      
    });
   }

  ngOnInit() {
  }

}
