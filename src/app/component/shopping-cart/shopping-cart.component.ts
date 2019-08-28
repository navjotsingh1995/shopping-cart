import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  shoppingCartItemCount: number;

  constructor(private ShoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
      this.cart$ = await this.ShoppingCartService.getCart()
      this.cart$.valueChanges().subscribe(cart=>{
        this.shoppingCartItemCount = 0;
        for(let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
      })
      console.log(this.cart$);
      
  }

}
