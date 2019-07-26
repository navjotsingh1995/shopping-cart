import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(private afAuth:AngularFireAuth,private route: ActivatedRoute) {
    this.user$= this.afAuth.authState;
   }

  login(){
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/'; 
  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }
  
  logout(){
    this.afAuth.auth.signOut();
  }
}


