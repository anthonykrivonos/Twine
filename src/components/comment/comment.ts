import { Component, Input, OnInit } from '@angular/core';
import { timeago } from 'time-ago.js';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Analytics } from '../../classes/analytics';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';
import { Score } from '../../classes/score';

import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxJS';

@Component({
  selector: 'twine-comment',
  templateUrl: 'comment.html',
  providers: [Time, Twine, Twiner, Analytics, Alert, User, Score]
})
export class CommentComponent {
      @Input() id;
      @Input() idx;
      @Input() text;
      @Input() date;
      @Input() twine;

      time:Observable<any>;

      userObs:Observable<any>;
      twiner:FirebaseObjectObservable<any>;

      constructor(public timeClass:Time, public twinerClass:Twiner, public twineClass:Twine, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public alert:Alert, public user:User, public scoreClass:Score){}

      ngOnInit():void {
            console.log("~ ButtonComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.twiner = this.twinerClass.getTwinerObservableById(this.id);
            console.log("Got twiner with id: " + this.id)
            this.time = Observable.of(this.timeClass.timeSince(this.date));
            console.log("Current time: " + this.time)
            this.user.getUser((user)=>{
                  this.userObs = Observable.of(user);
            }, ()=>{
                  console.error("Could not set user observable")
            });
            console.log("- ngOnInit Resolved -");
      }

      delete():void {
            console.log("- delete Starting -");
            this.alert.showAlert('Delete comment?', 'You said, \"' + this.text + '\"', 'Delete', () => {
                  this.analytics.eventDeleteComment(this.twine);
                  this.scoreClass.decreaseTwineComments();
                  this.twineClass.deleteFromTwine(this.twine, 'comments', this.idx, () => {
                        console.log("Deleted comment");
                  });
            });
            console.log("- delete Resolved -");
      }
}
