import { Component, Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

import { Twiner } from '../classes/twiner';
import { Configuration } from '../classes/configuration';

@Injectable()
@Component({
  providers: [Configuration, Twiner]
})
export class Notification {
      constructor(public db: AngularFireDatabase, public events:Events, public configuration:Configuration, public twinerClass:Twiner) {}

      getTwinerNotificationsObservableById(id:any):FirebaseListObservable<any> {
            return this.db.list('/twiners/' + id + '/notifications/');
      }

      hideNotification(id:any, idx:any) {
            this.db.object('/twiners/' + id + '/notifications/' + idx + '/hidden/').set(true);
      }

      unhideNotification(id:any, idx:any) {
            this.db.object('/twiners/' + id + '/notifications/' + idx + '/hidden/').set(false);
      }

      sendPush(title:string, body:string, tokens:any, type:string = undefined):void {
            if (tokens.length > 0) { this.events.publish('sendNotification', title, body, tokens) };
      }

      sendPushToTwine(twineId:any, id:any, title:string, body:string, type:string = undefined):void {
            this.db.object('/twines/' + twineId).take(1).subscribe((twine)=>{
                  this.db.object('/twiners/' + twine.twinee1.id).take(1).subscribe((t1) => {
                        this.db.object('/twiners/' + twine.twinee2.id).take(1).subscribe((t2) => {
                              this.db.object('/twiners/' + twine.twiner).take(1).subscribe((t3) => {
                                    var tokens = [];
                                    this.twinerClass.isHidden(twine.twinee1.id, twineId, (hidden1) => {
                                          if (!hidden1 && (id != twine.twinee1.id)) {this.configuration.checkPush(twine.twinee1.id, type, () => {tokens.push(t1.token)});}
                                          this.twinerClass.isHidden(twine.twinee2.id, twineId, (hidden2) => {
                                                if (!hidden2 && (id != twine.twinee2.id)) {this.configuration.checkPush(twine.twinee2.id, type, () => {tokens.push(t2.token)});}
                                                this.twinerClass.isHidden(twine.twiner, twineId, (hidden3) => {
                                                      if (!hidden3 && (id != twine.twiner)) {this.configuration.checkPush(twine.twiner, type, () => {tokens.push(t3.token)});}
                                                })
                                          })
                                    });
                                    Observable.timer(2000).take(1).subscribe(()=>{
                                          this.sendPush(title, body, tokens, type);
                                    });
                              });
                        });
                  });
            });
      }

      pushNewNotification(id:any, notifId:any, title:string, body:string, type:string = null, callback:any = null) {
            this.twinerClass.isBlocked(id, notifId, (blocked) => {
                  if (!blocked) {
                        id = JSON.parse(JSON.stringify(id));
                        console.log("Pushing notification to " + id + " from " + notifId + " concerning " + body + ".");
                        this.getTwinerNotificationsObservableById(id).take(1).subscribe((notifications)=>{
                              var length = notifications.length;
                              this.db.object('/twiners/' + id + '/notifications/' + length).set(this.newNotification(notifId, title, body, type)).then(()=>{
                                    if (callback) {callback(this.newNotification(notifId, title, body, type));}
                              });
                        });
                  }
            });
      }

      newNotification(id:any, title:string, body:string, type:string = undefined):any {
            const date = Date.now();
            return {
                  date: date,
                  hidden: false,
                  id: id,
                  seen: false,
                  title: title,
                  body: body,
                  type: type
            };
      }

      pushNotificationToTwineParticipants(twineId:any, id:any, title:string, body:string, type:string = undefined) {
            this.db.object('/twines/' + twineId).take(1).subscribe((twine)=>{
                  this.twinerClass.isHidden(twine.twinee1.id, twineId, (hidden) => {
                        if (!hidden && id != twine.twinee1.id) { this.pushNewNotification(twine.twinee1.id, id, title, body, type); }
                  });
                  this.twinerClass.isHidden(twine.twinee2.id, twineId, (hidden) => {
                        if (!hidden && id != twine.twinee2.id) { this.pushNewNotification(twine.twinee2.id, id, title, body, type); }
                  });
                  this.twinerClass.isHidden(twine.twiner, twineId, (hidden) => {
                        if (!hidden && id != twine.twiner) { this.pushNewNotification(twine.twiner, id, title, body, type); }
                  });
            });
      }

      pushTwineNotification(twineId:any, userId:any) {
            this.db.object('/twines/' + twineId).take(1).subscribe((twine)=>{
                  this.twinerClass.isHidden(twine.twinee1.id, twineId, (hidden) => {
                        if (!hidden) {this.pushNewNotification(twine.twinee1.id, twine.twiner, twine.twiner, twine.twiner + " just twined you!", "twine");}
                  })
                  this.twinerClass.isHidden(twine.twinee2.id, twineId, (hidden) => {
                        if (!hidden) {this.pushNewNotification(twine.twinee2.id, twine.twiner, twine.twiner, twine.twiner + " just twined you!", "twine");}
                  })
                  this.db.object('/twiners/' + twine.twinee1.id).take(1).subscribe((t1) => {
                        this.db.object('/twiners/' + twine.twinee2.id).take(1).subscribe((t2) => {
                              var tokens = [];
                              this.twinerClass.isHidden(twine.twinee1.id, twineId, (hidden) => {
                                    if (!hidden) { this.configuration.checkPush(twine.twinee1.id, "twine", () => {tokens.push(t1.token)}); }
                              });
                              this.twinerClass.isHidden(twine.twinee2.id, twineId, (hidden) => {
                                    if (!hidden) { this.configuration.checkPush(twine.twinee2.id, "twine", () => {tokens.push(t2.token)}); }
                              });
                              Observable.timer(2000).take(1).subscribe(()=>{
                                    this.sendPush(null, twine.twiner + " just twined you!", [t1.token, t2.token], "twine");
                              });
                        });
                  });
            });
      }

      pushCommentNotification(twineId:any, commenterId:any, comment:any) {
            console.log("Pushing comment notification");
            this.db.object('/twines/' + twineId).take(1).subscribe((twine)=>{
                  var commenters = [];
                  var tokens = []
                  var commenterName, twinerName;
                  var comments = JSON.parse(JSON.stringify(twine.comments));
                  this.db.object('/twiners/' + commenterId).take(1).subscribe((cm) => {
                        var commenterName = cm.name;
                        this.pushNotificationToTwineParticipants(twineId, commenterId, commenterName, commenterName + " commented on your twine!", "comment");
                        this.sendPushToTwine(twineId, commenterId, null, commenterName + " commented on your twine!", "comment");
                  });
                  this.db.object('/twiners/' + twine.twiner).take(1).subscribe((twiner) => {
                        twinerName = twiner.name;
                  });
                  for (var i = 0; i < comments.length; i++) {
                        var commenter = comments[i].id;
                        if (commenters.indexOf(commenter) < 0 && commenter != commenterId && commenter != twine.twinee1.id
                               && commenter != twine.twinee2.id && commenter != twine.twiner) {
                              commenters.push(commenter);
                              this.db.object('/twiners/' + commenter).take(1).subscribe((cm) => {
                                    this.twinerClass.isHidden(cm.id, twineId, (hidden) => {
                                          if (!hidden) {this.configuration.checkPush(cm.id, "comment", () => {tokens.push(cm.token)});}
                                    })
                              });
                              this.pushNewNotification(twineId, commenterId, null, commenterName + " also commented on " + twinerName + "'s twine!", "comment");
                        }
                  }
                  Observable.timer(2000).take(1).subscribe(()=>{
                        this.sendPush(null, commenterName + " also commented on " + twinerName + "'s twine!", tokens, "comment")
                  });
            });
      }

      pushLikeNotification(id:any, twineId:any) {
            this.db.object('/twines/' + twineId).take(1).subscribe((twine)=>{
                  this.db.object('/twiners/' + id).take(1).subscribe((liker) => {
                        this.pushNotificationToTwineParticipants(twine.id, id, null, liker.name + " liked your twine!", "like");
                        this.sendPushToTwine(twine.id, id, null, liker.name + " liked your twine!", "like");
                  });
            });
      }

      pushMessageNotification(id:any, messagerId:any, twineId:any, message:any) {
            this.twinerClass.isHidden(id, twineId, (hidden) => {
                  if (!hidden) {
                        this.db.object('/twiners/' + id).take(1).subscribe((receiver) => {
                              this.db.object('/twiners/' + messagerId).take(1).subscribe((messager) => {
                                    this.pushNewNotification(id, messagerId, messager.name, messager.name + " just sent you a message!", "message",()=>{
                                          this.configuration.checkPush(receiver.id, "message", () => {
                                                this.sendPush(null, messager.name + " just sent you a message!", [receiver.token], "message");
                                          });
                                    });
                              });
                        });
                  }
            })
      }
}
