import { Injectable, Component } from '@angular/core';
import { IonicPage, IonicModule } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { FCM } from '@ionic-native/fcm';

import { Twine } from '../classes/twine';
import { Twiner } from '../classes/twiner';
import { Configuration } from '../classes/configuration';
import { Analytics } from '../classes/analytics';
import { User } from '../classes/user';
import { Contacts } from '../classes/contacts';
import { Score } from '../classes/score';

import { MainPage } from '../main/main';
import { FeedComponent } from '../components/feed/feed';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
@Component({
  providers: [Twine, Twiner, Configuration, Analytics, FeedComponent, User, Contacts, Score]
})
export class Login {
      DEBUG:boolean = true;
      autoLogin:boolean = false;
      token:string = "";

      options:PushOptions = {
            android: {
                  senderID: '19978743716',
                  sound: 'true',
                  vibrate: 'true',
                  clearBadge: 'true',
                  clearNotifications: 'true',
                  forceShow: 'true'
            },
            ios: {
                  alert: 'true',
                  badge: 'true',
                  sound: 'false',
                  senderID: '19978743716',
                  clearBadge: 'true'
            }
      };

      pushObject: PushObject;

      twiner: FirebaseObjectObservable<any>;

<<<<<<< HEAD
      constructor(public configuration:Configuration, public twineClass:Twine, public twinerClass:Twiner, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage: NativeStorage, private facebook: Facebook, public feedComponent:FeedComponent, private push:Push, public user:User, public contacts:Contacts) {
      }
=======
      constructor(public configuration:Configuration, public twineClass:Twine, public twinerClass:Twiner, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage: NativeStorage, private facebook: Facebook, public feedComponent:FeedComponent, private push:Push, public user:User, public contacts:Contacts, public score:Score, private fcm: FCM) {}
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53

      checkUserOnDevice(resolve:any, reject:any):void {
            this.user.getUser((user) => {
                  this.twinerClass.getTwinerById(user.id, (twiner)=>{
                        twiner.id != null ? resolve(user.id) : reject();
                  });
            }, () => {
                  reject();
            });
      }

      callFacebookAPI(id:any, autologin:any = true, resolve:any = null, reject:any = null):void {
            console.log("- callFacebookAPI Starting -");
            console.log("Got id: " + id);
            this.facebook.api('/' + id + '?fields=first_name,email,friends,cover,picture.height(400)',[]).then((response) => {
                  var data = response;
                  data.cover = response.cover.source;
                  data.picture = response.picture.data.url;
                  data.friends = response.friends.data.map((fr) => { return fr.id });
                  this.autoLogin = autologin;
                  this.checkLogin(data, (user) => {
                        if (resolve) {resolve(user);}
                  });
            }).catch((e)=>{
                  if (reject) {reject();}
            });
            console.log("- callFacebookAPI Resolved -");
      }

      loginThroughFacebookAPI(resolve:any = null, reject:any = null):any {
            console.log("- loginThroughFacebookAPI Starting -");
            this.facebook.login(['public_profile', 'user_friends', 'email'])
              .then((res: FacebookLoginResponse) => {
                    this.callFacebookAPI(res.authResponse.userID, false, resolve, reject);
              })
              .catch(e => console.log('Error logging into Facebook', e));

            console.log("- loginThroughFacebookAPI Resolved -");
      }

      subscribeNotifications(callback:any = null):void {
            console.log("- subscribeNotifications Starting -");
<<<<<<< HEAD
            this.push.hasPermission().then((res: any) => {
                  if (res.isEnabled) {
                        this.pushObject = this.push.init(this.options);
                        this.pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
                        this.pushObject.on('registration').subscribe((registration: any) => {
                              this.token = registration.registrationId;
                              console.log('Saved token: ' + registration.registrationId);
=======
            const options: PushOptions = {
                  android: {
                        senderID: '19978743716'
                  },
                  ios: {
                        alert: 'true',
                        badge: true,
                        sound: 'false'
                  },
                  windows: {}
            };
            const pushObject: PushObject = this.push.init(options);
            this.push.hasPermission()
                  .then((res: any) => {
                        if (res.isEnabled) {
                              const pushObject: PushObject = this.push.init(this.options);
                              pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
                              pushObject.on('registration').subscribe((registration: any) => {
                                    this.token = registration.registrationId;
                                    alert("Token: " + this.token);
                                    console.log('Saved token: ' + registration.registrationId);
                              });
                              pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                              if (callback) {callback(true);}
                        });
                        this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
                        console.log('Push notifications enabled');
                  } else {
                        if (callback) {callback(false);}
                        console.log('Push notifications disabled');
                  }
            }).catch(()=>{
                  if (callback) {callback(false);}
                  console.log('Push notifications disabled');
            });
            console.log("- subscribeNotifications Resolved -");
      }

      checkLogin(data:any, callback:any = null):void {
            console.log("- checkLogin Starting -");
            this.subscribeNotifications((subscribed) => {
                  this.twinerClass.getTwinerById(data.id, (twiner)=>{
                        console.log("Received response: " + JSON.stringify(twiner, undefined, 2));
                        if (twiner.id) {
                              console.log("Response contains user");
                              this.login(data, (user) => {
                                    if (callback) {callback(user);}
                              });
                        } else {
                              console.log("Response does not contain user");
                              this.signUp(data, (user) => {
                                    if (callback) {callback(user);}
                              });
                        }
                  });
            });
            console.log("- checkLogin Resolved -");
      }

      signUp(data:any, callback:any = null):void {
            console.log("- signUp Starting -");
            const twinerObj = this.newTwiner(data);
            console.log("Created loginToObj: " + JSON.stringify(twinerObj, undefined, 2));
            this.db.object("/twiners/" + twinerObj.id).set(twinerObj).then(()=>{
                  this.twinerClass.getTwinerById(data.id, (twiner) => {
                        console.log("Opening feed");
                        this.setTwinerInStorage(twiner, () => {
                              if (callback) {callback(twiner);}
                        });
                  });
                  console.log("Set twiner data in firebase");
            }).catch(()=>{
                  console.error("Could not set twiner data in firebase");
            });
            console.log("- signUp Resolved -");
      }

      login(data:any, callback:any = null):void {
            console.log("- login Starting -");
            var twinerObj = this.existingTwiner(data);
            console.log("Created loginUpdateToObj: " + JSON.stringify(twinerObj, undefined, 2));
            this.twiner = this.twinerClass.getTwinerObservableById(data.id);
            this.twiner.update(twinerObj).then(()=>{
                  this.twinerClass.getTwinerById(data.id, (twiner) => {
                        console.log("Opening feed");
                        this.setTwinerInStorage(twiner, () => {
                              if (callback) {callback(twiner);}
                        });
                  });
                  console.log("Updated twiner data in firebase");
            }).catch(()=>{
                  console.error("Could not update twiner data in firebase");
            });
            console.log("- login Resolved -");
      }

      newTwiner(data:any):any {
            console.log("- loginToObject Starting -");
            const date = Date.now();
            console.log("Returning object");
            console.log("- loginToObject Resolved -");
            return this.twinerClass.generateNewTwinerObject(data.id, this.token, data.first_name, data.first_name,
                  data.email, data.picture, data.cover, data.friends, date, date, this.configuration.resetConfiguration(), this.score.getScoreAsObject(true));
      }

      existingTwiner(data:any):any {
            console.log("- loginUpdateToObject Started -");
            const date = Date.now();
            console.log("- loginUpdateToObject Resolved -");
            return this.twinerClass.generateExistingTwinerObject(this.token, data.first_name,
                  data.email, data.picture, data.cover, data.friends, date);
      }

      setTwinerInStorage(data:any, callback:any = null):void {
            this.user.storeUser(data, (user)=>{
                  this.contacts.storeContacts();
                  console.log("About to load analytics for login");
                  if (!this.autoLogin) {
                        this.analytics.eventLogin();
                        this.analytics.enable();
                  }
                  this.analytics.setUser(user.id, user.name, user.original_name, user.date_joined, user.score.score)
                  this.analytics.eventClick();
                  if (callback) {callback();}
            }, (e)=>{
                  console.error("Could not set twiner in storage: " + e);
            });
      }

      logOut(callback:any = null):void {
            console.log("Logging out");
            this.contacts.unStoreContacts();
            this.analytics.eventLogout();
            this.facebook.logout().then((res)=>{
                  this.user.unStoreUser(() => {
                        if (callback) {callback();}
                  });
            }).catch((e)=>{
                  console.error("Could not log out of Facebook");
            });
      }
}
