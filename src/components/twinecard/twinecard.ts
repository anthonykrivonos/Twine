import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Toast } from '../../classes/toast';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';

import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

import { MessagesPage } from '../../pages/messages/messages';

@Component({
  selector: 'twine-twine-card',
  templateUrl: 'twinecard.html',
  providers: [Time, Twine, Twiner, Toast, Alert, User]
})
export class TwinecardComponent {
      @Input('id') id;
      @ViewChild('slidingItem') slidingItem:ItemSliding;

      twineeName:string;
      twineeNum:number;
      userId:any = "";

      time:string;
      message:Observable<any>;
      hidden:Observable<any>;

      messages:FirebaseListObservable<any>;
      data:FirebaseObjectObservable<any>;
      dataSub:FirebaseObjectObservable<any>;
      twinee:FirebaseObjectObservable<any>;

      twiner:any;

      constructor(public timeClass:Time, public twinerClass:Twiner, public twineClass:Twine, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public navCtrl:NavController, public alert:Alert, public toast:Toast, public user:User){}

      ngOnInit():void {
            console.log("~ TwinecardComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.user.getUser((user) => {
                  this.userId = user.id;
                  this.data = this.twineClass.getTwineObservableById(this.id);
                  console.log("Loaded data observable");
                  this.twineClass.getTwineById(this.id, (data)=>{
                        this.twiner = data.twiner;
                        this.twineeNum = (data.twinee1.id != user.id ? 2 : 1);
                        this.twinee = this.twinerClass.getTwinerObservableById(data.twinee1.id != user.id ? data.twinee1.id : data.twinee2.id);
                        this.updateRecent();
                        this.twinee.take(1).subscribe((twinee) => {
                              this.twineeName = twinee.name;
                        });
                        this.twineClass.getHiddenObs(this.id, this.twineeNum, (hidden) => {
                              this.hidden = Observable.of(hidden);
                        });
                  });
            });
            console.log("- ngOnInit Resolved -");
      }

      toMessages():void {
            this.navCtrl.push(MessagesPage,
            {id:this.id, twinee:this.twinee, twiner:this.twiner},
            {
                  animate: true,
                  duration: 250
            }).then(()=>{
                  console.log("Opening MessagesPage with twine: " + this.id);
            }).catch((e)=>{
                  console.error("Could not open MessagesPage: " + e);
            });
      }

      updateRecent():void {
            this.twineClass.getLatestMessageById(this.id, (message)=>{
                  if (message) {
                        Observable.timer(1, 30000).subscribe(()=>{
                              this.time = this.timeClass.timeSince(message.date);
                        });
                        this.twinerClass.getTwinerObservableById(message.id).subscribe((sender)=>{
                              this.message = Observable.of((sender.id == this.userId ? 'You' : sender.name) + ": " + message.text);
                              console.log("Message: " + JSON.stringify(message, undefined, 2));
                        });
                  } else {
                        this.message = Observable.of("No messages found.");
                        this.time = "--";
                        console.log("No messages found for twine: " + this.id);
                  }
            });
      }

      hide():void {
            console.log("- hide Starting -");
            this.alert.showAlert('Hide Conversation?', 'You can unhide this conversation in the menu.', 'Hide',
                  () => {
                        this.user.getUser((user) => {
                              this.twinerClass.hide(user.id, this.id, (hidden) => {
                                    if (hidden) {
                                          this.toast.showToast('top', `You hid all your messages with ${this.twineeName}.`, 'secondary');
                                          this.twineClass.hide(this.id, this.twineeNum);
                                          this.slidingItem.close();
                                          this.updateRecent();
                                          console.log('Comment deleted');
                                    }
                              });
                        });
                  });
            console.log("- hide Resolved -");
      }
}
