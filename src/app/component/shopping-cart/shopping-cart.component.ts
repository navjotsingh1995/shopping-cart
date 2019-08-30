import { Product } from './../../models/product';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  product:Product;
  shoppingCartItemCount: number;
    cartKey:any;
  TotalPrice: number;
  quantity: number;
  constructor(private ShoppingCartService:ShoppingCartService,public productService: ProductService) { }

  async ngOnInit() {
      this.cart$ = await this.ShoppingCartService.getCart()
      this.cart$.valueChanges().subscribe(cart=>{
        this.cartKey= Object.values(cart.items);
        this.shoppingCartItemCount = 0;
        for(let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
      })


      

  }


}
