import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/anim/movie_animacion.json',
  };


  constructor() { }

  ngOnInit() {
  }

}
