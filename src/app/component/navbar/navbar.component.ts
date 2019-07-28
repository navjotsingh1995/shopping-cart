import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  appUser:AppUser;

  constructor(private auth:AuthService) {
    auth.appUser$.subscribe(appUser=>{
      this.appUser= appUser;
    })
  }




  logout(){
  this.auth.logout();
  }

}
