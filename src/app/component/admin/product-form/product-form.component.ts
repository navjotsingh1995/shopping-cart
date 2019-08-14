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
id;
  productData: any;
  constructor(private categoryService: CategoriesService,private productService:ProductService,private router:Router,private route: ActivatedRoute) {
   this.categories$=this.categoryService.getCategories();
    this.id=this.route.snapshot.paramMap.get('id');
    
    if(this.id){
      this.productService.get(this.id).snapshotChanges().pipe(take(1)).subscribe(p=>{
            this.product=p.payload.val();
      })
    }
   }

   save(product){
      if(this.id) {
      this.productService.update(this.id,product)
      }else{
        this.productService.create(product);
      }    
      this.router.navigate(['/admin/products'])
    
   }

  ngOnInit() {

  }
  delete(){
    if(!confirm('Are you sure you want to delete the product?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products'])
    
  }

}
