import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth:AngularFireAuth) { }

  async registerUser(email:string,password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }

  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password);
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut(){
    return await this.ngFireAuth.signOut();
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser;
  }


  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged((user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }

  async getAccessToken(): Promise<string | null> {
    const user = await this.getCurrentUser();
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      return idTokenResult.token;
    }
    return null;
  }
}
