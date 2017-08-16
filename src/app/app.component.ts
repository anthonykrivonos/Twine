import { Component, ViewChild} from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';

import { MainPage } from '../pages/main/main';
import { TwinesPage } from '../pages/twines/twines';
import { MessagesPage } from '../pages/messages/messages';
import { OnboardingPage } from '../pages/onboarding/onboarding';

import { Configuration } from '../classes/configuration';
import { PushNotification } from '../classes/pushnotification';
import { Analytics } from '../classes/analytics';
import { Toast } from '../classes/toast';
import { Login } from '../classes/login';
import { Global } from '../classes/global';

@Component({
  templateUrl: 'app.html',
  providers: [PushNotification, Configuration, Toast, Analytics, Login, Global]
})
export class MyApp {
  DEBUGGING: boolean = true;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private login:Login, public nativeStorage: NativeStorage, public configuration:Configuration, public global:Global, public splashScreen: SplashScreen, public statusBar: StatusBar, public pushNotification:PushNotification, public analytics:Analytics, public toast:Toast, public keyboard:Keyboard, public network:Network) {
      platform.ready().then(() => {
            console.log("Platform loaded");
            splashScreen.hide();
            statusBar.overlaysWebView(true);
            statusBar.styleDefault();
            this.login.checkUserOnDevice((id) => {
                  this.login.callFacebookAPI(id, true, (user) => {
                        this.nav.setRoot(OnboardingPage ,{}, {
                              duration: 0
                        }).then(()=>{
<<<<<<< HEAD
                              this.menuOpen();
=======
                              this.events.publish("menuOpen:click");
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                              this.nav.push(MainPage ,{
                                    user: user
                              }, {
                                    animate: true,
                                    animation: "wp-transition",
                                    duration: 250
                              });
                        });
                  }, () => {
                        this.nav.setRoot(OnboardingPage ,{}, {
                              animate: true,
                              animation: "wp-transition",
                              duration: 0
                        });
                  });
            }, () => {
                  this.nav.setRoot(OnboardingPage ,{}, {
                        animate: true,
                        animation: "wp-transition",
                        duration: 0
                  });
            });
      });
  }

  menuClose():void {
        this.global.menu('close');
  }

  menuOpen():void {
        this.global.menu('open');
  }

  menuOpen():void {
        this.events.publish('menuOpen:click');
  }
}
