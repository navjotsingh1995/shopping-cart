import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$;
  constructor(categoryService: CategoriesService) {
      console.log(this.categories$);

    this.categories$ = categoryService.getCategories();
   }

  ngOnInit() {
  }

}
