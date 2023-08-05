import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email:any;

  constructor(public authService:AuthService, public router:Router) { }

  ngOnInit() {
  }

  async PasswordNueva(){
    this.authService.resetPassword(this.email).then(() =>{
      this.router.navigate(['/login']);
    }).catch(error =>{
      console.log(error);
    });
  }

}
