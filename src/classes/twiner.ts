import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxJS';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Validator } from '../classes/validator';

@Injectable()
@Component({
  providers: [Validator]
})
export class Twiner {
      twinerProfile:any;
      feed: FirebaseListObservable<any>;
      feedData: FirebaseObjectObservable<any>;

      constructor(public db: AngularFireDatabase, public validator:Validator) {}

      getTwinerById(id:any, callback:any):any {
            this.db.object('/twiners/' + id).take(1).subscribe((twiner)=>{
                  callback(twiner);
            });
      }

      getTwinerObservableById(id:any):FirebaseObjectObservable<any> {
            return this.db.object('/twiners/' + id);
      }

      getNameById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.name) });
      }

      getOriginalNameById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.original_name) });
      }

      getPictureById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.picture) });
      }

      getCoverById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.cover) });
      }

      getEmailById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.email) });
      }

      getDateJoinedById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.date_joined) });
      }

      getLastLoginById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.last_login) });
      }

      getFriendsById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.friends) });
      }

      getFeedById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.feed) });
      }

      getTwinesById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.twines) });
      }

      getInvitationsById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.invitations) });
      }

      getTokenById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.token) });
      }

      getNotificationsById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.notifications) });
      }

      getAnalyticsById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.analytics) });
      }

      getConfigurationById(id:any, callback:any):any {
            this.getTwinerObservableById(id).take(1).subscribe((res) => { callback(res.config) });
      }

      alertTwiner(id:any, callback:any):void {
            this.getTwinerObservableById(id).take(1).subscribe((res)=>alert("Twiner with ID " + id + ": " + JSON.stringify(res)));
      }

      logTwiner(id:any, callback:any):void {
            this.getTwinerObservableById(id).take(1).subscribe((res)=>console.log("Twiner with ID " + id + ": " + JSON.stringify(res)));
      }

      pushToTwiner(id:string, listName:string, twiner:string, callback:any = null, duplicates:boolean = false):void {
            var list = this.db.list('/twiners/' + twiner + "/" + listName);
            var arrList;
            list.take(1).subscribe((l) => {
                  arrList = JSON.parse(JSON.stringify(l)) || [];
                  if (arrList.length > 0 && '$value' in arrList[0]) {
                        arrList = arrList.map((res)=>{
                              return res.$value;
                        });
                  }
                  if (duplicates && arrList.indexOf(id) > -1 || arrList.indexOf(id) < 0) {
                        arrList.push(id);
                        var listObj = this.db.object('/twiners/' + twiner + '/' + listName);
                        listObj.set(arrList).then(()=>{
                              if (callback) {callback(id, length);}
                        });
                  }
            });
      }

      unshiftToTwiner(id:string, listName:string, twiner:string, callback:any = null, duplicates:boolean = false):void {
            var list = this.db.list('/twiners/' + twiner + "/" + listName);
            var arrList;
            list.take(1).subscribe((l) => {
                  arrList = JSON.parse(JSON.stringify(l)) || [];
                  if (arrList.length > 0 && '$value' in arrList[0]) {
                        arrList = arrList.map((res)=>{
                              return res.$value;
                        });
                  }
                  if (duplicates && arrList.indexOf(id) > -1 || arrList.indexOf(id) < 0) {
                        arrList.unshift(id);
                        var listObj = this.db.object('/twiners/' + twiner + '/' + listName);
                        listObj.set(arrList).then(()=>{
                              if (callback) {callback(id, length);}
                        });
                  }
            });
      }

      deleteFromTwiner(id:string, listName:string, twiner:string, callback:any = null):void {
            var list = this.db.list('/twiners/' + twiner + "/" + listName);
            var arrList;
            list.take(1).subscribe((l) => {
                  arrList = JSON.parse(JSON.stringify(l)) || [];
                  if (arrList.length > 0 && '$value' in arrList[0]) {
                        arrList = arrList.map((res)=>{
                              return res.$value;
                        });
                  }
                  if (arrList.indexOf(id) > -1) {
                        arrList.splice(arrList.indexOf(id), 1);
                        var listObj = this.db.object('/twiners/' + twiner + '/' + listName);
                        listObj.set(arrList).then(()=>{
                              if (callback) {callback(id, length);}
                        });
                  }
            });
      }

      getFromTwine(listName:string, id:string, callback:any):any {
            var list = this.db.list('/twiners/' + id + "/" + listName);
            var arrList;
            list.take(1).subscribe((l) => {
                  arrList = JSON.parse(JSON.stringify(l)) || [];
                  if (arrList.length > 0 && '$value' in arrList[0]) {
                        arrList = arrList.map((res)=>{
                              return res.$value;
                        });
                  }
                  callback(arrList);
            });
      }

      addTwine(id:any, twine:any, callback:any = null) {
            this.db.list('/twiners/' + id + '/twines/').take(1).subscribe((twines)=>{
                  this.db.object('/twiners/' + id + '/twines/' + twines.length).set(twine).then(()=>{
                        if (callback) {callback();}
                  });
            });
      }

      addTwineInvitation(id:any, twine:any, callback:any = null) {
            this.db.list('/twiners/' + id + '/invitations/').take(1).subscribe((twines)=>{
                  this.db.object('/twiners/' + id + '/invitations/' + twines.length).set(twine).then(()=>{
                        if (callback) {callback();}
                  });
            });
      }

      addTwineToFeed(id:any, twine:any, callback:any = null) {
            this.db.list('/twiners/' + id + '/feed/').take(1).subscribe((twines)=>{
                  if (!twines.includes(twine)) {
                        this.db.object('/twiners/' + id + '/feed/' + twines.length).set(twine).then(()=>{
                              if (callback) {callback();}
                        });
                  }
            });
      }

      addFriend(id:any, friend:any, callback:any = null) {
            this.db.list('/twiners/' + friend + '/friends/').take(1).subscribe((friends)=>{
                  friends = friends.map((f) => {return f.$value});
                  if (friends && friends.indexOf(id) < 0) {
                        friends.push(id);
                        this.db.object('/twiners/' + friend + '/friends/').update(friends).then(()=>{
                              this.db.list('/twiners/' + id + '/friends/').take(1).subscribe((friends)=>{
                                    friends = friends.map((f) => {return f.$value});
                                    if (friends && friends.indexOf(friend) < 0) {
                                          friends.push(friend);
                                          this.db.object('/twiners/' + id + '/friends/').update(friends).then(()=>{
                                                if (callback) {callback();}
                                          });
                                    }
                              });
                        });
                  }
            });
      }

      feedFanOut(id:any, twine:any) {
            this.addTwineToFeed(id, twine);
            this.getTwinerObservableById(id).take(1).subscribe((user) => {
                  user.friends.forEach((fr)=>{
                        this.addTwineToFeed(fr.$value || fr, twine);
                  });
            });
      }

      block(id:any, blockee:any, callback:any = null) {
            this.db.list('/twiners/' + id + '/blocked/').take(1).subscribe((blocked)=>{
                  blocked = JSON.parse(JSON.stringify(blocked)).map((b)=>{return b.$value});
                  if (blocked && blocked.indexOf(blockee) < 0) {
                        blocked.push(blockee);
                  } else {
                        blocked.splice(blocked.indexOf(blockee), 1);
                  }
                  this.db.object('/twiners/' + id + '/blocked/').set(blocked).then(()=>{
                        if (callback) {callback();}
                  });
            });
      }

      hide(id:any, twine:any, callback:any = null) {
            this.db.list('/twiners/' + id + '/hidden/').take(1).subscribe((hidden)=>{
                  hidden = JSON.parse(JSON.stringify(hidden)).map((h)=>{return h.$value});
                  hidden.push(twine);
                  this.db.object('/twiners/' + id + "/hidden/").set(hidden).then(()=>{
                        if (callback) {callback(true);}
                  }).catch((e) => {
                        if (callback) {callback(false);}
                  });
            });
      }

      unhide(id:any, twine:any, callback:any = null) {
            this.db.list('/twiners/' + id + '/hidden/').take(1).subscribe((hidden)=>{
                  hidden = JSON.parse(JSON.stringify(hidden)).map((h)=>{return h.$value});
                  hidden.splice(hidden.indexOf(twine), 1);
                  this.db.object('/twiners/' + id + "/hidden/").set(hidden).then(()=>{
                        if (callback) {callback(true);}
                  }).catch((e) => {
                        if (callback) {callback(false);}
                  });
            });
      }

      updateName(id:any, name:any, callback:any = null) {
            name = this.validator.validator(name);
            this.db.object('/twiners/' + id + '/name/').set(name).then(()=>{
                  if (callback) {callback(name);}
            });
      }

      isHidden(id:any, twine:any, callback:any = null) {
            this.db.object('/twiners/' + id + '/hidden/').take(1).subscribe((hidden) => {
                  if (hidden != null && hidden.length > 0) {
                        if (callback) {callback(hidden.includes(twine));}
                  } else {
                        if (callback) {callback(false);}
                  }
            })
      }

      isBlocked(id:any, twinee:any, callback:any = null) {
            this.db.object('/twiners/' + id + '/blocked/').take(1).subscribe((blocked) => {
                  if (blocked != null && blocked.length > 0) {
                        if (callback) {callback(blocked.includes(twinee));}
                  } else {
                        if (callback) {callback(false);}
                  }
            })
      }

      generateNewTwinerObject(id:number, token:string, name:string, original_name:string, email:string, picture:string, cover:string,
            friends:any, date_joined:number, last_login:number, config:any, score:any):any {
            return {
                  id: id,
                  token: token,
                  name: name,
                  original_name: original_name,
                  email: email,
                  picture: picture,
                  cover:cover,
                  friends: friends,
                  date_joined: date_joined,
                  last_login: last_login,
                  config: config,
                  score: score
            }
      }

      generateExistingTwinerObject(token:string, original_name:string, email:string, picture:string, cover:string,
            friends:any, last_login:number):any {
            return {
                  token: token,
                  original_name: original_name,
                  email: email,
                  picture: picture,
                  cover: cover,
                  friends: friends,
                  last_login: last_login
            }
      }
}
