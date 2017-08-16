import { Component } from '@angular/core';

import { Login } from '../../classes/login';
import { MainPage } from '../main/main';

import { NavController, NavParams, Content, Events } from 'ionic-angular';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
  providers: [Login]
})
export class OnboardingPage {

      constructor(public navCtrl: NavController, public login:Login, public events:Events) {}

      fbLogin():any {
            console.log("- fbLogin Starting -");
            this.login.loginThroughFacebookAPI((user)=>{
<<<<<<< HEAD
                  this.events.publish("menu:open");
=======
                  this.events.publish("menuOpen:click");
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                  this.navCtrl.push(MainPage , {
                        user: user
                  }, {
                        animate: true,
                        animation: "wp-transition",
                        duration: 250
                  });
            });
            console.log("- fbLogin Resolved -");
      }
}
