import { Component, Input, OnInit } from '@angular/core';
import { timeago } from 'time-ago.js';
import { Events } from 'ionic-angular';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Notification } from '../../classes/notification';
import { User } from '../../classes/user';

import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxJS';

@Component({
  selector: 'twine-notification',
  templateUrl: 'notification.html',
  providers: [Time, Twine, Twiner, Notification, User]
})
export class NotificationComponent {
      @Input() id;
      @Input() idx;
      @Input() title;
      @Input() body;
      @Input() date;
      @Input() hidden;
      @Input() seen;

      time:Observable<any>;

      boxshadow:Observable<any>;

      user:any;
      twiner:FirebaseObjectObservable<any>;

      constructor(public timeClass:Time, public twinerClass:Twiner, public twineClass:Twine, public notificationClass:Notification, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public events:Events, public userClass:User){}

      ngOnInit():void {
            console.log("~ NotificationComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.boxshadow = Observable.of(this.seen ? "0 0 1px #515151" : "0 0 6px #038ac9");
            this.twiner = this.twinerClass.getTwinerObservableById(this.id);
            console.log("Got twiner with id: " + this.id)
            Observable.timer(1, 30000).subscribe(()=>{
                  this.time = Observable.of(this.timeClass.timeSince(this.date));
            });
            console.log("Current time: " + this.time)
            this.userClass.getUser((user)=>{
                  this.user = user;
                  console.log("Set commenter observable")
            }, ()=>{
                  console.error("Could not set commenter observable")
            });
            console.log("- ngOnInit Resolved -");
      }

      hide():void {
            console.log("- hide Starting -");
            this.notificationClass.hideNotification(this.user.id, this.idx);
            console.log("- hide Resolved -");
      }
}
