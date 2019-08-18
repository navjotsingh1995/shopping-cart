import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService, private router: Router,private user:UserService) {
    auth.user$.subscribe(user => {
      if(!user) return;
      if (user) {
        this.user.save(user);


        const returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }


}
