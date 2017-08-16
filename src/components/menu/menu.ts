import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { IonicPage, IonicModule, Events, Slides } from 'ionic-angular';

import { Twiner } from '../../classes/twiner';
import { Configuration } from '../../classes/configuration';
import { Mail } from '../../classes/mail';
import { Analytics } from '../../classes/analytics';
import { Score } from '../../classes/score';
import { Validator } from '../../classes/validator';
import { Toast } from '../../classes/toast';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';
import { Vibration } from '../../classes/vibration';
import { Contacts } from '../../classes/contacts';
import { Global } from '../../classes/global';

import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Network } from '@ionic-native/network';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { BlockcardComponent } from '../components/blockcard/blockcard';
import { NotificationComponent } from '../components/notification/notification';
import { OnboardingPage } from '../../pages/onboarding/onboarding';

import { AppVersion } from '@ionic-native/app-version';

import { Observable } from 'rxJS';

@Component({
  selector: 'twine-menu',
  templateUrl: 'menu.html',
  providers: [Twiner, Configuration, Mail, Analytics, Score, Toast, Validator, Alert, User, Keyboard, Vibration, Contacts, Global]
})
export class MenuComponent implements OnInit {
      @ViewChild('slides') slides: Slides;

      id:any;
      updatedName:string = "";
      bug:string = "";
      help:string = "";

      online:boolean = true;

      twiner:FirebaseObjectObservable<any>;

      notifications:any = [];

      QUERY_INTERVAL = 5;
      queryCount:number = 5;
      end:boolean = false;

      friends:FirebaseListObservable<any>;
      FAQs:FirebaseListObservable<any>;
      hidden:FirebaseListObservable<any>;

      policy:FirebaseObjectObservable<any>;

      background:Observable<any>;
      version:Observable<any>;
      score:Observable<any>;
      contactsList:Observable<any>;

      twinesOption:any;
      messagesOption:any;
      likesOption:any;
      commentsOption:any;
      vibrationOption:any;

      tab:string = 'notifications';
      subtab:string = '';

      constructor(private nativeStorage:NativeStorage, private statusBar:StatusBar, public twinerClass:Twiner, public configuration:Configuration, public facebook:Facebook, public events:Events, public db: AngularFireDatabase, public appVersion:AppVersion, public mail:Mail, public alert:Alert, public analytics:Analytics, public scoreClass:Score, public validator:Validator,
<<<<<<< HEAD
            public toast:Toast, public network:Network, public user:User, public keyboard:Keyboard, public vibration:Vibration, public contacts:Contacts, public global:Global) {
            global.menu("open", ()=>{
                  this.openMenu();
            });
            global.menu("close", ()=>{
=======
            public toast:Toast, public network:Network, public user:User, public keyboard:Keyboard, public vibration:Vibration, public contacts:Contacts) {
            events.subscribe("menuOpen:click", ()=>{
                  this.loadMenu();
            });
            events.subscribe("menuClose:click", ()=>{
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                  this.closeMenu();
            });
            network.onConnect().subscribe(()=>{
                  this.online = true;
            });
            network.onDisconnect().subscribe(()=>{
                  this.online = false;
            });
            keyboard.onKeyboardHide().subscribe(()=>{
                  this.resetName();
            });
      }

      ngOnInit():void {
            console.log("~ MenuComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            console.log("- ngOnInit Resolved -");
      }

      feedback():void {
            if (this.vibrationOption){this.vibration.vibrationShort();}
      }

      toggleTwinesOption():void {
            this.twinesOption = this.configuration.setTwinesNotifications(this.twinesOption ? true : false);
            this.configuration.logConfiguration();
      }

      toggleMessagesOption():void {
            this.messagesOption = this.configuration.setMessagesNotifications(this.messagesOption ? true : false);
            this.configuration.logConfiguration();
      }

      toggleLikesOption():void {
            this.likesOption = this.configuration.setLikesNotifications(this.likesOption ? true : false);
            this.configuration.logConfiguration();
      }

      toggleCommentsOption():void {
            this.commentsOption = this.configuration.setCommentsNotifications(this.commentsOption ? true : false);
            this.configuration.logConfiguration();
      }

      toggleVibrationOption():void {
            this.feedback();
            this.vibrationOption = this.configuration.setVibration(this.vibrationOption ? true : false);
            this.configuration.logConfiguration();
      }

      lockSlides(lock:boolean):void {
            this.slides.onlyExternal = lock;
      }

      iterateSlide(subtab:string):void {
            this.subtab = subtab;
            this.slides.slideNext();
            this.lockSlides(false);
      }

      deIterateSlide():void {
            Observable.timer(200).take(1).subscribe(() => this.subtab = '');
            this.lockSlides(true);
            this.slides.slidePrev();
      }

      loadOptions():void {
            this.configuration.loadConfiguration((config) => {
                  this.twinesOption = config.notifications.twines;
                  this.messagesOption = config.notifications.messages;
                  this.likesOption = config.notifications.likes;
                  this.commentsOption = config.notifications.comments;
                  this.vibrationOption = config.vibrationOption;
            });
      }

      loadScore(callback:any = null):void {
            console.log("Setting score");
            this.scoreClass.getAll((scoreObj) => {
                  var score, comments = 0;
                  this.score = Observable.of(scoreObj);
                  if (callback) { callback(scoreObj); }
            });
      }

      loadContacts():void {
            this.contacts.getContacts((contacts) => {
                  this.contactsList = Observable.of(contacts);
                  console.log("Got contacts: " + JSON.stringify(contacts));
            }, (e) => {
                  this.contactsList = Observable.of([]);
                  console.error("Could not get contacts.");
            });
      }

      whiteStatusBar(white:boolean = true):void {
            white ? this.statusBar.styleLightContent() : this.statusBar.styleDefault();
      }

      closeMenu():void {
            this.loadNotifications();
            this.seenAll();
            this.whiteStatusBar(false);
      }

      openMenu():void {
            console.log("- loadMenu Starting -");
<<<<<<< HEAD
            this.whiteStatusBar(true);
=======
            this.statusBar.styleLightContent();
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
            this.loadOptions();
            this.loadContacts();
            this.analytics.setScreenTo('menu');
            this.user.getUser((user)=>{
                  this.id = user.id;
                  this.twiner = this.twinerClass.getTwinerObservableById(this.id);
                  this.friends = this.db.list('/twiners/' + user.id + '/friends/');
                  this.hidden = this.db.list('/twiners/' + user.id + "/hidden/");
                  this.FAQs = this.db.list('/general/faqs');
                  this.policy = this.db.object('/general/policy');
                  this.loadNotifications();
                  this.loadScore();
                  this.twiner.take(1).subscribe((twiner) => {
                        this.updatedName = twiner.name;
                  });
                  console.log("Loaded twines observable for twine count");
            }, (e)=>{
                  console.error("Could not load twines observable for twine count");
            })
            this.appVersion.getVersionNumber().then((num) => {
                  this.version = Observable.of(num);
                  console.log("Got version number: " + num);
            }).catch((e) => {
                  this.version = Observable.of("Twine Me 2017");
                  console.error("Could not get version number");
            });
            console.log("- loadMenu Resolved -");
      }

      closeMenu():void {
            this.statusBar.styleDefault();
            this.loadNotifications();
            this.analytics.setScreenTo('feed');
            this.seenAll();
      }

      logOut():void {
            this.alert.showAlert('Logout?', 'You will return to the login screen.', 'Logout', () => {
                  this.configuration.setLoggedIn(false);
                  this.events.publish('logout');
            });
      }

      resetName():void {
            if (this.updatedName == "") {
                  this.twinerClass.getOriginalNameById(this.id, (original_name) => {
                        this.updatedName = original_name;
                        this.updateName();
                  });
            }
      }

      updateName():void {
            this.user.getUser((user)=>{
                  this.twinerClass.updateName(user.id, this.updatedName, (name) => {
                        this.updatedName = name;
                  });
            });
      }

      checkSend(type:string):void {
            if (type == 'bug') {
                  this.bug = this.validator.validator(this.bug);
                  if (this.bug == "") { return; }
            } else {
                  this.help = this.validator.validator(this.help);
                  if (this.help == "") { return; }
            }
            this.alert.showAlert((type == 'bug' ? 'Report bug?' : 'Request help?'), 'Your ' + (type == 'bug' ? 'bug report' : 'help request') + ' will be promptly sent to the Twine development team.',
                  (type == 'bug' ? 'Report' : 'Request'), () => {
                        this.sendMail(type);
                        this.toast.showToast('top', (type == 'bug' ? 'Bug report' : 'Help request') + ' submitted successfully!', 'secondary');
                  });
      }

      sendMail(type:string):void {
            if (type == 'bug') {
                  this.mail.sendMail(type, this.bug);
                  this.bug = "";
            } else {
                  this.mail.sendMail(type, this.help);
                  this.help = "";
            }
            this.deIterateSlide();
      }

      loadNotifications():void {
            this.notifications = [];
            this.db.list('/twiners/' + this.id + '/notifications/', {
                  query: {
                        limitToLast: this.QUERY_INTERVAL
                  }
            }).subscribe((notifications)=>{
                  if (notifications) {
                        notifications.forEach((n)=>{
                              if (!this.notifications.includes(n)) {
                                    this.notifications.unshift(n);
                              }
                        });
                  }
            });
      }

      extendNotifications(count:number, callback:any = undefined):void {
            this.db.list('/twiners/' + this.id + '/notifications/', {
                  query: {
                        orderByKey: true,
                        startAt: `${this.queryCount}`,
                        endAt: `${this.queryCount += count}`
                  }
            }).map((array) => array.reverse()).subscribe((notif)=>{
                  notif.length > 0 ? notif.forEach((n)=>{if (!notif.includes(n)) {this.notifications.push(n)}}) : this.end = true;
                  if (notif.length < this.QUERY_INTERVAL) {this.end = true;}
                  Observable.timer(500).take(1).subscribe(()=>{
                        if (callback) {callback();}
                  });
            });
      }

      infiniteScroll(infiniteScroll):void {
            this.extendNotifications(this.QUERY_INTERVAL, ()=>{
                  this.vibration.vibrationResponsive();
                  infiniteScroll.complete();
            });
      }

      seenAll():void {
            this.twinerClass.getNotificationsById(this.id, (notifications)=>{
                  if (notifications) {
                        notifications.forEach((notif) => {
                              notif.seen = true;
                        });
                        this.db.object('/twiners/' + this.id + '/notifications/').set(notifications);
                  }
            })
      }
}
