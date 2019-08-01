import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$;
  array: any=[];
  data:any;
  constructor(private productService:ProductService) {

   this.products$=this.productService.getAll().snapshotChanges();
    this.products$.forEach(element => {
     element.forEach(element => {
            this.array= element.payload;
        
      });;
      console.log(this.array);
      
      
    });
   
   
//    .pipe(map((res:any)=>{
         
//             res.forEach(key=>{
//              this.array= key.payload.toJSON()
//              console.log("key==>",key.key);
//              console.log(this.array);
             
             
       
//         })

  
// }));

    
    // .subscribe(item=>{
    //   Object.keys(item).pipe(map(key=>{
    //     // let obj = { key, ...item[key]}
    //     console.log("obj",key)
    //   }))
    // })
   
  
   }

  ngOnInit() {
  }

}
