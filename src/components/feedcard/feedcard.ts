import { Component, Input, OnInit } from '@angular/core';

import { Events } from 'ionic-angular';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Notification } from '../../classes/notification';
import { Analytics } from '../../classes/analytics';
import { User } from '../../classes/user';
import { Vibration } from '../../classes/vibration';
import { Configuration } from '../../classes/configuration';
import { Score } from '../../classes/score';

import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

@Component({
  selector: 'twine-feed-card',
  templateUrl: 'feedcard.html',
  providers: [Time, Twine, Twiner, Notification, Analytics, User, Vibration, Configuration, Score]
})
export class FeedcardComponent implements OnInit {
      @Input('id') id;

      time:Observable<any>;
      likes:Observable<any>;
      comments:Observable<any>;
      caption:Observable<any>;
      privacy:Observable<any>;

      data:FirebaseObjectObservable<any>;
      twinee1:FirebaseObjectObservable<any>;
      twinee2:FirebaseObjectObservable<any>;
      twiner:FirebaseObjectObservable<any>;

      userData:any;
      twinee:string = "twinee1";
      toggleCom:boolean = false;
      hasUserLike:boolean;
      online:boolean = true;
      vibrate:boolean = false;

      constructor(public timeClass:Time, public twinerClass:Twiner, public twineClass:Twine, public notificationClass:Notification, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public events:Events, public network:Network, public keyboard:Keyboard, public user:User,
            public vibration:Vibration, public configuration:Configuration, public scoreClass:Score) {
            network.onConnect().subscribe(()=>{
                  this.online = true;
            });
            network.onDisconnect().subscribe(()=>{
                  this.online = false;
            });
            events.subscribe("comments:off", ()=>{
                  this.toggleComments(false);
            });
            events.subscribe("comments:on", ()=>{
                  this.toggleComments(true);
            });
            keyboard.onKeyboardHide().subscribe(()=>{
                  this.toggleComments(false);
            });
      }

      ngOnInit():void {
            this.keyboard.disableScroll(true);
            this.twineClass.getTwineObservableById(this.id).subscribe((twine)=>{
                  console.log("Subscribed to data observable");
                  Observable.timer(1, 30000).subscribe(()=>{
                        this.time = Observable.of(this.timeClass.timeSince(twine.date));
                  });
                  console.log("Set time");
                  this.likes = Observable.of((twine.likes ? twine.likes.length : 0));
                  console.log("Set likes");
                  this.comments = Observable.of((twine.comments ? twine.comments.length : 0));
                  console.log("Set comments");
                  this.caption = Observable.of((twine.caption ? twine.caption : ""));
                  console.log("Set caption");
                  this.privacy = Observable.of(twine.privacy ? twine.privacy : "public");
                  console.log("Set privacy");
                  this.twinee1 = this.twinerClass.getTwinerObservableById(twine.twinee1.id);
                  console.log("Set twinee1");
                  this.twinee2 = this.twinerClass.getTwinerObservableById(twine.twinee2.id);
                  console.log("Set twinee2");
                  this.twiner = this.twinerClass.getTwinerObservableById(twine.twiner);
                  console.log("Set twiner");
                  this.user.getUser((user) => {
                        this.userData = user;
                        this.hasUserLike = twine.likes.includes(user.id);
                        if (twine.twinee1.id == user.id) {
                              this.twinee = "twinee1";
                        } else if (twine.twinee2.id == user.id) {
                              this.twinee = "twinee2";
                        } else {
                              this.twinee = "twiner";
                        }
                  });
            });
            console.log("- ngOnInit Resolved -");
      }

      toggleComments(toggle:boolean = null):void {
            console.log("- toggleComments Starting -");
            if (toggle == null && this.toggleCom == false) {
                  this.events.publish("comments:off");
            }
            toggle == null ? this.toggleCom = !this.toggleCom : this.toggleCom = toggle;
            console.log("- toggleComments Resolved -");
      }

      like():void {
            console.log("- like Starting -");
            if (!this.online) {
                  console.log("User offline");
                  return;
            } else {
                  this.twineClass.getLikesById(this.id, (likes)=>{
                        likes.includes(this.userData.id) ? this.doUnlike(likes || [], this.userData.id) : this.doLike(likes || [], this.userData.id);
                  });
            }
            console.log("- like Resolved -");
      }

      doLike(likes:any, id:any):void {
            likes.push(id);
            this.hasUserLike = true;
            this.notificationClass.pushLikeNotification(id, this.id);
            this.analytics.eventLike(this.id);
            this.scoreClass.increaseTwinesLiked();
            this.setLikes(likes);
      }

      doUnlike(likes:any, id:any):void {
            this.hasUserLike = false;
            likes.splice(likes.indexOf(id), 1);
            this.analytics.eventUnlike(this.id);
            this.scoreClass.decreaseTwinesLiked();
            this.setLikes(likes);
            console.log("Removing like by: " + id);
      }

      setLikes(likes:any, callback:any = undefined):void {
            this.db.object('/twines/' + this.id + '/likes').set(likes).then(()=>{
                  console.log("Set likes to: " + likes);
                  if (callback) {callback();}
            });
      }
}
