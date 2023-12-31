import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  LoginFrom!: FormGroup;
  
  constructor(public formBuilder:FormBuilder,public loadingCtrl:LoadingController,public authService:AuthService, public router:Router) { }

  ngOnInit() {
    this.LoginFrom = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password: ['',[Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8]).{8,}")]]
    })
  }

  get errorControl(){
    return this.LoginFrom?.controls;
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.LoginFrom?.valid) {
        const user = await this.authService.loginUser(this.LoginFrom.value.email,this.LoginFrom.value.password).catch(error =>{
          console.log(error);
          loading.dismiss();
        })

        if (user) {
          loading.dismiss();
          this.router.navigate(['/home'])
        }else{
          console.log('provide correct values.');
        }
    }
  }

  async loginInWithTwitter() {
    try {
      await this.authService.signInWithTwitter();
      // Aquí rediriges a la página deseada después de iniciar sesión con éxito.
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión con Twitter:', error);
    }
  }

  // Metodo 2

  onClickTwitterLogin(){
    this.authService.TwitterAuth().then((res) =>{
      this.router.navigate(['/home']);
    }).catch(err =>{
      console.log(err);
    });
  }
}
