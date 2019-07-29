import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$;
  constructor(categoryService: CategoriesService,private productService:ProductService) {
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$);
   }

   save(product){
      
      this.productService.create(product);
   }

  ngOnInit() {
  }

}
