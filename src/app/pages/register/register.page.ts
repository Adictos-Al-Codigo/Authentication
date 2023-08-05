import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  RegistroFrom!: FormGroup;

  constructor(public formBuilder:FormBuilder,public loadingCtrl:LoadingController, public authService:AuthService,public router:Router) { }

  ngOnInit() {
    this.RegistroFrom = this.formBuilder.group({
      fullname : ['',Validators.required],
      email: ['',[Validators.required,Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password: ['',[Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8]).{8,}")]]
    })
  }

  get errorControl(){
    return this.RegistroFrom?.controls;
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.RegistroFrom?.valid) {
        const user = await this.authService.registerUser(this.RegistroFrom.value.email,this.RegistroFrom.value.password).catch(error =>{
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
}
