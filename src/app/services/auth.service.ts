import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable,of } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(private afAuth:AngularFireAuth,private route: ActivatedRoute,private auth:AuthService,private userService:UserService) {
    this.user$= this.afAuth.authState;
   }

  login(){
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl',returnUrl);
  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());


  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user=>{
      if(user){
        return this.userService.get(user.uid).valueChanges();
      }else{
        return of(null)
            }}
    ))
  }
}


