import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class Twine {
      twine:any;
      feed: FirebaseListObservable<any>;
      feedData: FirebaseObjectObservable<any>;

      constructor(public db: AngularFireDatabase) {}

      getTwineById(id:any, callback:any):any {
            this.db.object('/twines/' + id).take(1).subscribe((twine)=>{
                  callback(twine);
            });
      }

      getTwineObservableById(id:any):FirebaseObjectObservable<any> {
            return this.db.object('/twines/' + id);
      }

      getCaptionById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.caption); });
      }

      getCommentsById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.comments); });
      }

      getConversationStarterById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.conversation_starter); });
      }

      getDateById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.date); });
      }

      getLikesById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.likes); });
      }

      getNumLikesById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.likes.length); });
      }

      getMessagesById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.messages); });
      }

      getPrivacyById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.privacy); });
      }

      getTwinee1ById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.twinee1); });
      }

      getTwinee2ById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.twinee2); });
      }

      getTwinerInTwineById(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res) => { callback(res.twiner); });
      }

      alertTwine(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res)=>alert("Twine with ID " + id + ": " + JSON.stringify(res)));
      }

      logTwine(id:any, callback:any):void {
            this.getTwineObservableById(id).take(1).subscribe((res)=>console.log("Twine with ID " + id + ": " + JSON.stringify(res)));
      }

      pushToTwine(twine:any, listName:string, item:any, callback:any = null, duplicates:boolean = false):void {
            var list = this.db.list('/twines/' + twine + "/" + listName);
            var arrList;
            list.take(1).subscribe((l) => {
                  arrList = JSON.parse(JSON.stringify(l)) || [];
                  if (arrList.length > 0 && '$value' in arrList[0]) {
                        arrList = arrList.map((res)=>{
                              return res.$value;
                        });
                  }
                  if (duplicates && arrList.indexOf(item) > -1 || arrList.indexOf(item) < 0) {
                        arrList.push(item);
                        var listObj = this.db.object('/twines/' + twine + '/' + listName);
                        listObj.set(arrList).then(()=>{
                              if (callback) {callback(item, length);}
                        });
                  }
            });
      }

      unshiftToTwine(id:string, listName:string, twine:string, callback:any = null, duplicates:boolean = false):void {
            var list = this.db.list('/twines/' + twine + "/" + listName);
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
                        var listObj = this.db.object('/twines/' + twine + '/' + listName);
                        listObj.set(arrList).then(()=>{
                              if (callback) {callback(id, length);}
                        });
                  }
            });
      }

      deleteFromTwine(twine:any, listName:string, item:any, callback:any = null):void {
            this.db.list('/twines/' + twine + "/" + listName).take(1).subscribe((l) => {
                  var arrList = JSON.parse(JSON.stringify(l)) || [];
                  if (arrList.length > 0 && '$value' in arrList[0]) {
                        arrList = arrList.map((res)=>{
                              return res.$value;
                        });
                  }
                  if (arrList.includes(item) || arrList.length > item) {
                        arrList.splice(arrList.indexOf(item), 1);
                        var listObj = this.db.object('/twines/' + twine + '/' + listName);
                        listObj.set(arrList).then(()=>{
                              if (callback) {callback(item, length);}
                        });
                  }
            });
      }

      getFromTwine(listName:string, twine:string, callback:any):any {
            var list = this.db.list('/twines/' + twine + "/" + listName);
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

      addTwine(data:any, callback:any) {
            this.db.list('/twines/').take(1).subscribe((twines)=>{
                  var length = JSON.parse(JSON.stringify(twines)).length;
                  this.db.object('/twines/' + length).set(JSON.parse(JSON.stringify(data)));
                  this.db.object('/twines/' + length + "/id/").set(length);
                  callback(length);
            })
      }

      hide(id:any, twineeNum:any, callback:any = undefined) {
            this.db.object('/twines/' + id + "/twinee" + twineeNum + "/hidden/").set(true).then(() => {
                  if (callback) {callback(true);}
            }).catch(() => {
                  if (callback) {callback(false);}
            });
      }

      unhide(id:any, twineeNum:any, callback:any = undefined) {
            this.db.object('/twines/' + id + "/twinee" + twineeNum + "/hidden/").set(false).then(() => {
                  if (callback) {callback(true);}
            }).catch(() => {
                  if (callback) {callback(false);}
            });
      }

      getHiddenObs(id:any, twineeNum:any, callback:any = undefined) {
            this.db.object('/twines/' + id + "/twinee" + twineeNum + "/hidden/").subscribe((hidden) => {
                  if (hidden && callback) { callback(Boolean(hidden.$value)); }
            });
      }

      getHidden(id:any, twineeNum:any, callback:any = undefined) {
            this.db.object('/twines/' + id + "/twinee" + twineeNum + "/hidden/").take(1).subscribe((hidden) => {
                  if (hidden && callback) { callback(Boolean(hidden.$value)); }
            });
      }

      getLatestMessageById(id:any, callback:any):void {
            this.db.list('/twines/' + id + "/messages/", {
                  query: {
                        orderByKey: true,
                        limitToLast: 1
                  }
            }).take(1).subscribe((res) => { callback(res[0]); });
      }
}
