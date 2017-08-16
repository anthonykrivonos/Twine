import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, IonicModule, MenuController, NavController, NavParams, Events } from 'ionic-angular';

import { translateY } from '../../animations/translateY';
import { translateX } from '../../animations/translateX';

import { TwinesPage } from '../twines/twines';

import { FacebookAuth, User } from '@ionic/cloud-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Configuration } from '../../classes/configuration';
import { Login } from '../../classes/login';
import { Analytics } from '../../classes/analytics';
import { Vibration } from '../../classes/vibration';
import { Global } from '../../classes/global';

import { ButtonComponent } from '../../components/button/button';

import { Observable } from 'rxJS';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
<<<<<<< HEAD
  providers: [Configuration, ButtonComponent, Vibration, Global],
=======
  providers: [Configuration, ButtonComponent, Vibration, Analytics],
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
  animations: [translateY(110, "-100vh", "0vh"), translateX(250, "-100vw", "0vw")]
})
export class MainPage implements OnInit {
      @ViewChild('slides') slides:any;
      @ViewChild('button') button:ButtonComponent;

      user:any = this.navParams.get('user');
      vibrate:boolean = false;
      slidePosition:any = -1;
      toggleX:string = 'false';
      toggleY:string = 'false';

<<<<<<< HEAD
      constructor(public navCtrl:NavController, public facebookAuth:FacebookAuth, public userClass:User, public menuCtrl:MenuController, public events:Events, public navParams:NavParams, public nativeStorage:NativeStorage, public configuration:Configuration, public login:Login, public vibration:Vibration, public global:Global) {
            global.login('logout', () => {
=======
      feed:boolean = true;

      constructor(public navCtrl:NavController, public facebookAuth:FacebookAuth, public userClass:User, public menuCtrl:MenuController, public events:Events, public navParams:NavParams, public nativeStorage:NativeStorage, public configuration:Configuration, public login:Login, public vibration:Vibration, public analytics:Analytics, public statusBar:StatusBar) {
            events.subscribe('logout', () => {
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                  this.logOut();
            });
            events.subscribe('toggle:screen', () => {
                  this.toggleAnimation('Y');
            });
      }

      ngOnInit():void {
            console.log("* MainPage Opened *");
            console.log("- ngOnInit Starting -");
            console.log("Disabling swipe back");
            this.navCtrl.swipeBackEnabled = false;
            this.global.menu('close');
            this.configuration.loadConfiguration(()=>{
                  this.configuration.setLoggedIn(true);
            });
            this.configuration.checkVibration(this.user.id, (vibrate)=>{
                  this.vibrate = vibrate;
            });
            console.log("- ngOnInit Resolved -");
      }

      ionViewDidEnter():void {
            this.analytics.setScreenTo('feed');
            this.statusBar.styleDefault();
      }

      feedback():void {
            if (this.vibrate){this.vibration.vibrationResponsive();}
      }

      toMenu():void {
            console.log("- toMenu Starting -");
<<<<<<< HEAD
            this.events.publish('menu:open');
=======
            this.events.publish('menuOpen:click');
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
            this.menuCtrl.open().then(()=>{
                  console.log("Opened menu");
            }).catch(()=>{
                  console.error("Could not open menu");
            });
            console.log("- toMenu Resolved -");
      }

      toTwines():void {
            console.log("- toTwines Starting -");
            this.navCtrl.push(TwinesPage, {user: this.user},{
                  animate: true,
                  animation: "wp-transition",
                  duration: 250
            }).then(()=>{
                  console.log("Opening TwinesPage");
            }).catch((e)=>{
                  console.error("Could open TwinesPage: " + e);
            });
            console.log("- toTwines Resolved -");
      }

      createTwine():void {
            if (this.button.getToggle() == 'start') {
                  this.toggleAnimation('Y');
            } else {
                  this.events.publish('createTwine');
            }
      }

      toggleAnimation(toggle:string):void {
            console.log("- toggleAnimation Starting -");
            this.feedback();
            if (toggle == 'X') {
                  console.log("Toggling X");
                  this.toggleX == 'true' ? this.toggleX = 'false' : this.toggleX = 'true';
            } else {
                  console.log("Toggling Y");
                  if (this.toggleY == 'true') {
                        this.button.toTop();
                        this.toggleY = 'false';
                        this.feed = true;
                        console.log("Y toggled to top");
                  } else {
                        this.button.toBottom();
                        this.toggleY = 'true';
                        this.analytics.setScreenTo('screen');
                        Observable.timer(500).take(1).subscribe(()=>{this.feed = false;});
                        console.log("Y toggled to bottom");
                  }
            }
            console.log("- toggleAnimation Resolved -");
      }

      logOut():void {
            console.log("- logOut Starting -");
            this.login.logOut(()=>{
                  this.menuCtrl.close();
                  this.navCtrl.popToRoot({
                        animate: true,
                        animation: "wp-transition",
                        duration: 250
                  });
            });
            console.log("- logOut Resolved -");
      }
}
