import { Component, Output, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides, MenuController } from 'ionic-angular';

import { MenuPage } from '../../pages/menu/menu';
import { TwinesPage } from '../../pages/twines/twines';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Notification } from '../../classes/notification';
import { Analytics } from '../../classes/analytics';
import { Validator } from '../../classes/validator';
import { Toast } from '../../classes/toast';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';
import { Score } from '../../classes/score';
<<<<<<< HEAD
import { Online } from '../../classes/online';
import { Global } from '../../classes/global';
=======
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53

import { ButtonComponent } from '../../components/button/button';

import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

@Component({
  selector: 'twine-screen',
  templateUrl: 'screen.html',
<<<<<<< HEAD
  providers: [Time, Twine, Twiner, Notification, Analytics, ButtonComponent, Validator, Alert, User, Score, Online]
=======
  providers: [Time, Twine, Twiner, Notification, Analytics, ButtonComponent, Validator, Alert, User, Score]
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
})
export class ScreenComponent implements OnInit {
      @Input('user') user;
      @ViewChild('friendsSld') friendsSld:Slides;
      @ViewChild('otherFriendsSld') otherFriendsSld:Slides;
      @ViewChild('twinee1in') twinee1Input;
      @ViewChild('twinee2in') twinee2Input;

      name:FirebaseObjectObservable<string>;

      privacy:string = "public";

      error:boolean = false;
      starterVisible:boolean = false;

      caption:string = "";
      starter:string = "";
      twinee1:string = "";
      twinee2:string = "";
      currTwinee1:string = "";
      currTwinee2:string = "";

      TWINEE1:number = 1;
      TWINEE2:number = 2;

      friendId:number;
      friendObs:Observable<any>;
      otherFriendId:number;
      otherFriendObs:Observable<any>;

      friends:any;
      friendsObs:Observable<any>;
      otherFriends:any;
      otherFriendsObs:Observable<any>;

      buttonVisible:Observable<any>;
      backVisible:Observable<any>;

      online:boolean;

<<<<<<< HEAD
      constructor(public global:Global, public navCtrl:NavController, public menuCtrl:MenuController, public alert:Alert, public twineClass:Twine, public twinerClass:Twiner, public notificationClass:Notification, public analytics:Analytics, public db:AngularFireDatabase, public nativeStorage:NativeStorage, public button:ButtonComponent, public toast:Toast,
            public validator:Validator, public onlineClass:Online, public keyboard:Keyboard, public scoreClass:Score){
            global.twine('check', ()=>{
=======
      constructor(public events:Events, public navCtrl:NavController, public menuCtrl:MenuController, public alert:Alert, public twineClass:Twine, public twinerClass:Twiner, public notificationClass:Notification, public analytics:Analytics, public db:AngularFireDatabase, public nativeStorage:NativeStorage, public button:ButtonComponent, public toast:Toast,
            public validator:Validator, public network:Network, public keyboard:Keyboard, public scoreClass:Score){
            events.subscribe('createTwine', ()=>{
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                  this.checkTwine();
            });
            onlineClass.connected(()=>{
                  this.online = true;
            });
            onlineClass.disconnected(()=>{
                  this.online = false;
            });
      }

      ngOnInit():void {
            console.log("~ ScreenComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.name = this.db.object('/twiners/' + this.user.id + '/name/');
            this.resetFriends();
            console.log("- ngOnInit Resolved -");
      }

      generateFriendsList(callback:any = undefined):void {
            console.log("- generateFriendsList Starting -");
            this.twinerClass.getFriendsById(this.user.id, (friends)=>{
                  this.friends = friends;
                  this.friendsObs = Observable.of(friends.map((fr)=>{
                        return this.twinerClass.getTwinerObservableById(fr);
                  }));
                  this.friendId = this.friends[0];
                  this.friendObs = this.twinerClass.getTwinerObservableById(this.friendId);
                  this.friendObs.take(1).subscribe((friend) => {
                        this.currTwinee1 = friend.name;
                  })
                  if (callback) {callback();}
                  console.log("Collected user's friends: " + JSON.stringify(friends, undefined, 2));
            });
            console.log("- generateFriendsList Resolved -");
      }

      generateUniqueFriendsList(callback:any = undefined):void {
            console.log("- generateUniqueFriendsList Starting -");
            this.twinerClass.getFriendsById(this.friendId, (friends)=>{
                  var uniqueFriends = friends ? this.friends.filter((fr)=>{
                        return !friends.includes(fr) && fr != this.friendId;
                  }) : [];
                  console.log("Filtered unique friends: " + JSON.stringify(friends, undefined, 2));
                  this.otherFriends = uniqueFriends;
                  this.otherFriendsObs = Observable.of(uniqueFriends.map((fr)=>{
                        return this.twinerClass.getTwinerObservableById(fr);
                  }));
                  this.otherFriendId = uniqueFriends ? this.otherFriends[0] : null;
                  this.otherFriendObs = this.otherFriendId ? this.twinerClass.getTwinerObservableById(this.otherFriendId) : null;
                  this.otherFriendId ? this.twinerClass.getTwinerById(this.otherFriendId, (twinee) => {
                        this.currTwinee2 = twinee.name;
                  }) : this.currTwinee2 = "No Users Found";
                  if (callback) {callback();}
                  console.log("Collected non-mutual (second) friends: " + JSON.stringify(uniqueFriends, undefined, 2));
            });
            console.log("- generateUniqueFriendsList Resolved -");
      }

      clearFields():void {
            this.privacy = "public";
            this.starterVisible = false;
            this.caption = "";
            this.starter = "";
            this.twinee1 = "";
            this.twinee2 = "";
            this.resetFriends();
            this.error = false;
      }

      setFriend() {
            console.log("- setFriend Starting -");
            var i = this.friendsSld.getActiveIndex();
            console.log("Idx: " + i);
            this.friendsObs.take(1).subscribe((friends) => {
                  i = i < friends.length ? i : friends.length - 1;
                  this.friendObs = friends[i];
                  friends[i].take(1).subscribe((fr) => {
                        this.friendId = fr;
                        this.currTwinee1 = fr.name;
                        this.generateUniqueFriendsList();
                  })
            });
            console.log("- setFriend Resolved -");
      }

      setOtherFriend() {
            console.log("- setOtherFriend Starting -");
            var i = this.otherFriendsSld.getActiveIndex();
            console.log("Idx: " + i);
            this.otherFriendsObs.take(1).subscribe((friends) => {
                  i = i < friends.length ? i : friends.length - 1;
                  this.otherFriendObs = friends[i];
                  friends[i].take(1).subscribe((fr) => {
                        this.otherFriendId = fr.id;
                        this.currTwinee2 = fr.name;
                  });
            });
            console.log("- setOtherFriend Resolved -");
      }

      pushTwines():void {
            console.log("- pushTwines Starting -");
            this.navCtrl.push(TwinesPage, {}, {
                  animate: true,
                  animation: "wp-transition",
                  duration: 250
            });
            console.log("- pushTwines Resolved -");
      }

      pushMenu():void {
            console.log("- pushMenu Starting -");
            this.navCtrl.popToRoot({
                  animate: true,
                  animation: "wp-transition",
                  duration: 250
            });
            console.log("- pushMenu Resolved -");
      }

      createTwine():void {
            console.log("- createTwine Starting -");
            var data = this.generateTwineData();
            console.log("Generated twine data: " + JSON.stringify(data, undefined, 2));
            this.twineClass.addTwine(data, (id)=>{
                  console.log("Added twine with id: " + id);
                  this.twinerClass.addTwineInvitation(this.friendId, id);
                  this.twinerClass.addTwineInvitation(this.otherFriendId, id);
                  this.notificationClass.pushTwineNotification(id, this.user.id);
<<<<<<< HEAD
                  this.analytics.incTwinesMade();
                  if (this.starter != "") {this.analytics.incStarterCount();}
=======
                  this.scoreClass.increaseTwinesMade();
                  if (this.starter != "") {this.scoreClass.increaseStarterCount();}
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                  this.closeScreen();
                  console.log("Added Twine to each twinee's invitations list");
            });
            console.log("- createTwine Resolved -");
      }

      generateTwineData():any {
            var twine = new Object();
            const date = Date.now();
            return {
                  caption: this.caption,
                  conversation_starter: this.starter,
                  date: date,
                  deleted: false,
                  privacy: this.privacy,
                  twinee1: {
                        accepted: "pending",
                        hidden: false,
                        id: this.friendId
                  },
                  twinee2: {
                        accepted: "pending",
                        hidden: false,
                        id: this.otherFriendId
                  },
                  messages: [
                        {
                              date: date,
                              id: this.user.id,
                              text: this.starter
                        }
                  ],
                  twiner: this.user.id
            }
      }

      toMenu():void {
            console.log("- toMenu Starting -");
            this.closeScreen();
            this.menuCtrl.open().then(()=>{
                  console.log("Opened menu")
            }).catch(()=>{
                  console.error("Could not open menu");
            });
            console.log("- toMenu Resolved -");
      }

      toTwines():void {
            console.log("- toTwines Starting -");
            this.navCtrl.push(TwinesPage, {user: this.user}, {
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

      closeScreen():void {
<<<<<<< HEAD
            this.global.button('top');
            this.global.screen('toggle');
=======
            this.events.publish('topButton:click');
            this.events.publish('toggle:screen');
            this.analytics.setScreenTo('feed');
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
            this.keyboard.close();
            setTimeout(() => {
                  this.clearFields();
            }, 500);
      }

      resetFriends():void {
            this.generateFriendsList(() => {
                  this.generateUniqueFriendsList();
            });
      }

      slideTo(id:any, twinee:number):void {
            if (twinee == this.TWINEE1) {
                  this.friendsSld.slideTo(this.friends.indexOf(id));
            } else {
                  this.otherFriendsSld.slideTo(this.otherFriends.indexOf(id));
            }
      }

      find(twinee:number):void {
            console.log("- find Starting -");
            this.twinee1 = this.validator.validator(this.twinee1);
            this.twinee2 = this.validator.validator(this.twinee2);
            var frObs = (twinee == this.TWINEE1 ? this.friendsObs : this.otherFriendsObs);
            if ((twinee == this.TWINEE1 && this.twinee1 == "") || (twinee == this.TWINEE2 && this.twinee2 == "")) { return; }
            frObs.take(1).subscribe((friends) => {
                  friends.forEach((fr, i) => {
                        fr.take(1).subscribe((f) => {
                              console.log('Friend #' + i + ": " + f.name);
                              if (f.name.toLowerCase().startsWith((twinee == this.TWINEE1 ? this.twinee1 : this.twinee2).toLowerCase())) {
                                    console.log("\"" + f.name + '\" includes substring \"' + (twinee == this.TWINEE1 ? this.twinee1 : this.twinee2) + "\"");
                                    this.slideTo(f.id, twinee);
                                    this.setFriend();
                                    return;
                              };
                        })
                  });
            });
            console.log("- find Resolved -");
      }

      checkTwine():void {
            this.caption = this.validator.validator(this.caption);
            this.starter = this.validator.validator(this.starter);
            if (this.caption == "") {
                  console.log("Caption text blank");
                  this.error = true;
                  return;
            } else if (this.friendId == this.otherFriendId) {
                  console.log("Friend IDs match");
                  return;
            } else if (!this.online) {
                  console.log("User is offline");
                  return;
            }
            this.friendObs.take(1).subscribe((twinee1) => {
                  this.otherFriendObs.take(1).subscribe((twinee2) => {
                        this.alert.showAlert('Create Twine?', 'You are twining ' + twinee1.name + ' and ' + twinee2.name + '.', 'Twine',
                              () => {
                                    this.createTwine();
                                    this.toast.showToast('top', 'Twine invitations sent to ' + twinee1.name + ' and ' + twinee2.name + '.')
                              });
                  })
            })
      }
}
