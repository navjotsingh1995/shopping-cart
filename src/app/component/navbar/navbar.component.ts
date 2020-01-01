import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  appUser:AppUser;
  shoppingCartItemCount:number;

  constructor(private auth:AuthService,private shoppingCartService:ShoppingCartService) {
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=>{this.appUser= appUser;})
      let cart$ = await this.shoppingCartService.getCart();
      cart$.valueChanges().subscribe(cart=>{
        this.shoppingCartItemCount = 0;
        for(let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
      })
   
  }




  logout(){
  this.auth.logout();
  }

}
