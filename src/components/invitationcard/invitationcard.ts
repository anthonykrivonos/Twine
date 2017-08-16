import { Component, Input, OnInit } from '@angular/core';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Analytics } from '../../classes/analytics';
import { User } from '../../classes/user';

import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

@Component({
  selector: 'twine-invitation-card',
  templateUrl: 'invitationcard.html',
  providers: [Time, Twine, Twiner, Analytics, User]
})
export class InvitationcardComponent implements OnInit {
      @Input('id') id;

      userData:any;
      showStarter:boolean = false;
      twinee:string = "twinee1";

      caption:Observable<any>;
      starter:Observable<any>;
      time:Observable<any>;
      privacy:Observable<any>;

      twinee1:FirebaseObjectObservable<any>;
      twinee2:FirebaseObjectObservable<any>;
      twiner:FirebaseObjectObservable<any>;

      online:boolean = true;

      constructor(public timeClass:Time, public twinerClass:Twiner, public twineClass:Twine, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public user:User, public network:Network){
            network.onConnect().subscribe(()=>{
                  this.online = true;
            });
            network.onDisconnect().subscribe(()=>{
                  this.online = false;
            });
      }

      ngOnInit() {
            console.log("~ InvitationcardComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.twineClass.getTwineObservableById(this.id).subscribe((twine)=>{
                  console.log("Subscribed to data observable");
                  Observable.timer(1, 30000).subscribe(()=>{
                        this.time = Observable.of(this.timeClass.timeSince(twine.date));
                  });
                  console.log("Set time");
                  this.privacy = Observable.of(twine.privacy ? twine.privacy : "public");
                  console.log("Set privacy");
                  this.caption = Observable.of(twine.caption);
                  console.log("Set caption");
                  this.starter = Observable.of(twine.conversation_starter);
                  console.log("Set starter");
                  this.twinee1 = this.twinerClass.getTwinerObservableById(twine.twinee1.id);
                  console.log("Set twinee1");
                  this.twinee2 = this.twinerClass.getTwinerObservableById(twine.twinee2.id);
                  console.log("Set twinee2");
                  this.twiner = this.twinerClass.getTwinerObservableById(twine.twiner);
                  console.log("Set twiner");
                  this.user.getUser((user) => {
                        this.userData = user;
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

      accept(accepted):void {
            console.log("Handling invitation: " + accepted);
            this.user.getUser((user)=>{
                  console.log("Got user " + user.id);
                  this.twineClass.getTwineObservableById(this.id.$value).take(1).subscribe((twine)=>{
                        if (twine.twinee1.id == user.id) {
                              this.db.object('/twines/' + this.id.$value + '/twinee1/').update({
                                    accepted
                              });
                        } else {
                              this.db.object('/twines/' + this.id.$value + '/twinee2/').update({
                                    accepted
                              });
                        }
                        this.handleTwine();
                        accepted ? this.analytics.eventAccept(this.id) : this.analytics.eventDecline(this.id);
                  });
            });
      }

      handleTwine():void {
            this.twineClass.getTwineObservableById(this.id.$value).take(1).subscribe((twine)=>{
                  console.log(JSON.stringify(twine));
                  if (twine.twinee1.accepted == true && twine.twinee2.accepted == true) {
                        console.log("Both twinees accepted twine " + this.id.$value);
                        this.twinerClass.pushToTwiner(this.id.$value, "twines", twine.twinee1.id, false);
                        this.twinerClass.pushToTwiner(this.id.$value, "twines", twine.twinee2.id, false);
                        this.twinerClass.deleteFromTwiner(this.id.$value, "invitations", twine.twinee1.id);
                        this.twinerClass.deleteFromTwiner(this.id.$value, "invitations", twine.twinee2.id);
                        console.log("Pushed twines and deleted invitations");
                        if (twine.privacy && twine.privacy == "private") {
                              console.log("Private twine");
                              this.twinerClass.addTwineToFeed(twine.twinee1.id, this.id.$value);
                              this.twinerClass.addTwineToFeed(twine.twinee2.id, this.id.$value);
                              this.twinerClass.addTwineToFeed(twine.twiner, this.id.$value);
                              console.log("Fanned feed in");
                        } else {
                              console.log("Public twine");
                              this.twinerClass.feedFanOut(twine.twinee1.id, this.id.$value);
                              this.twinerClass.feedFanOut(twine.twinee2.id, this.id.$value);
                              this.twinerClass.feedFanOut(twine.twiner, this.id.$value);
                              console.log("Fanned feed out");
                        }
                        console.log("Adding friends");
                        this.twinerClass.addFriend(twine.twinee1.id, twine.twinee2.id);
                        console.log("Added friends");
                  } else if (twine.twinee1.accepted == false || twine.twinee2.accepted == false) {
                        console.log("Twine declined");
                        console.log("Deleting twine from invitations");
                        this.twinerClass.deleteFromTwiner(this.id.$value, "invitations", twine.twinee1.id);
                        this.twinerClass.deleteFromTwiner(this.id.$value, "invitations", twine.twinee2.id);
                        console.log("Updating deleted value in twine");
                        this.twinerClass.getTwinerObservableById(this.id.$value).update({
                              deleted: true
                        });
                  }
            });
      }
}
