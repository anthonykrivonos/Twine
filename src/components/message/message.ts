import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { User } from '../../classes/user';

import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

@Component({
  selector: 'twine-message',
  templateUrl: 'message.html',
  providers:[Time, Twine, Twiner, User]
})
export class MessageComponent implements OnInit {
      @Input('id') id:any;
      @Input('twiner') twiner:any;
      @Input('message') message:any;

      date:string;

      type:Observable<any>;
      messager:FirebaseObjectObservable<any>;

      constructor(public timeClass:Time, public twinerClass:Twiner, public twineClass:Twine, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public user:User){}

      ngOnInit() {
            console.log("~ MessageComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.date = this.timeClass.time(this.message.date);
            console.log("Loaded date using local time");
            this.user.getUser((user) => {
                  console.log("Loaded user from storage");
                  if (this.message.id == this.twiner) {
                        console.log("User is twiner");
                        this.type = Observable.of('twiner');
                        this.messager = this.twinerClass.getTwinerObservableById(this.message.id);
                        console.log("Loaded user");
                  } else if (this.message.id == user.id) {
                        console.log("User is a twinee");
                        this.type = Observable.of('user');
                        this.messager = this.twinerClass.getTwinerObservableById(user.id);
                        console.log("Loaded user");
                  } else {
                        console.log("User is other twinee");
                        this.type = Observable.of('twinee');
                        this.messager = this.twinerClass.getTwinerObservableById(this.message.id);
                        console.log("Loaded user");
                  }
            });
            console.log("- ngOnInit Resolved -");
      }
}
