import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  appUser:AppUser;
  cart$: Observable<ShoppingCart>

  constructor(private auth:AuthService,private shoppingCartService:ShoppingCartService) {
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=>{this.appUser= appUser;})
    let cart$ = await this.shoppingCartService.getCart();

  }




  logout(){
  this.auth.logout();
  }

}
