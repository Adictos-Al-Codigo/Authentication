import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userProfile: User | null = null;
  accessToken: string | null = null;
  apiKey: any | null = null;

  constructor(private auth:AuthService, public router:Router) {
  }



  async ngOnInit():Promise<void>{
    this.userProfile = await this.auth.getCurrentUser();
    this.accessToken = await this.auth.getAccessToken();
    this.apiKey = await this.auth.getProfile();
    debugger;
  }


  async Logout(){
    this.auth.signOut().then(() =>{
      this.router.navigate(['/landing']);
    });
  }

  async getProfile() {
    try {
      this.userProfile = await this.auth.getCurrentUser();
      debugger;
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  }
}
