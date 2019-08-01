import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$;
product:any={};
  constructor(private categoryService: CategoriesService,private productService:ProductService,private router:Router,private route: ActivatedRoute) {
   this.categoryService.getCategories()
    .snapshotChanges().pipe(map(res=>{
          res.forEach(element => {  
              let categories$= element.key;
              console.log(categories$);
              
          });
    }))

    let uid=this.route.snapshot.paramMap.get('uid');
    console.log(uid);
    if(uid){
      this.productService.get(uid).valueChanges().pipe(take(1)).subscribe(p=>{
            this.product=p;
            console.log(p);
            
      })
    }
    

    
   }

   save(product){
      
      this.productService.create(product);
      console.log(product);
      
      this.router.navigate(['/admin/products'])
    
   }

  ngOnInit() {
  }

}
