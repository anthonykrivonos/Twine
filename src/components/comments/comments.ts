import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';

import { Content } from 'ionic-angular';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Notification } from '../../classes/notification';
import { Analytics } from '../../classes/analytics';
import { Validator } from '../../classes/validator';
import { User } from '../../classes/user';
import { Score } from '../../classes/score';

import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Observable } from 'rxJS';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
      selector: 'twine-comments',
      templateUrl: 'comments.html',
      providers: [Time, Twine, Twiner, Notification, Analytics, Validator, User, Score]
})

export class CommentsComponent implements OnInit {
      text:any = "";
      @Input('id') id;
      @ViewChild(Content) content:Content;

      comments:FirebaseListObservable<any>;
      userObs:Observable<any>

      online:boolean = true;

      constructor(public twineClass:Twine, public notificationClass:Notification, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public validator:Validator, public network:Network, public keyboard:Keyboard, public user:User, public scoreClass:Score){
            network.onConnect().subscribe(()=>{
                  this.online = true;
            });
            network.onDisconnect().subscribe(()=>{
                  this.online = false;
            });
            keyboard.onKeyboardShow().subscribe(()=>{
                  this.bottomScroll(0);
            });
      }

      ngOnInit():void {
            console.log("~ CommentsComponent Loaded ~");
            this.comments = this.db.list('/twines/' + this.id + '/comments');
            this.comments.subscribe(()=>{
                  this.bottomScroll();
            });
            this.user.getUser((user) => {
                  this.userObs = Observable.of(user);
            });
      }

      bottomScroll(speed:number = 300, callback:any = undefined):void {
            console.log("- bottomScroll Started -");
            try {
                  this.content.scrollToBottom(speed).then(()=>{
                        if (callback) {callback();}
                        console.log("Scrolling to bottom");
                  }).catch((e)=>{
                        console.error("Could not scroll to bottom: " + e);
                  });
            } catch (e) {}
            console.log("- bottomScroll Resolved -");
      }

      comment():void {
            console.log("- comment Starting -");
            if (!this.online) {
                  console.log("Cannot comment: offline");
                  return;
            }
            this.text = this.validator.validator(this.text);
            if (this.text && this.text != '') {
                  console.log("Text is not blank");
                  this.user.getUser((user)=>{
                        var comment = {
                              date: Date.now(),
                              text: this.text,
                              id: user.id
                        };
                        console.log("Sent notification to all commenters");
                        console.log("Got user ID from storage: " + user.id);
                        this.twineClass.pushToTwine(this.id, 'comments', comment, () => {
                              console.log("Pushed comment to twine: " + comment.text);
                              this.notificationClass.pushCommentNotification(this.id, user.id, this.text);
                              this.keyboard.close();
                              this.bottomScroll();
                              this.text = "";
                              console.log("Set text to blank");
                        });
                  })
                  this.analytics.eventComment(this.id);
                  this.scoreClass.increaseTwineComments();
            }
            console.log("- comment Resolved -");
      }
}
