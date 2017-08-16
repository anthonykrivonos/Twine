import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Time } from '../../classes/time';
import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Notification } from '../../classes/notification';
import { Analytics } from '../../classes/analytics';
import { User } from '../../classes/user';
import { Validator } from '../../classes/validator';

import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';

import { Events } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';

@Component({
      selector: 'twine-message-card',
      templateUrl: 'messagecard.html',
      providers: [Time, Twine, Twiner, Notification, Analytics, User, Validator]
})
export class MessagecardComponent implements OnInit {
      @Input() placeholder: string;
      @Input('id') id;
      @Input('other') other;
      @ViewChild('textbar') textBar;
      text:any = "";

      activity:Observable<boolean>;
      placeholderText:Observable<string>;

      online:boolean = true;

      constructor(public twineClass:Twine, public twinerClass:Twiner, public notificationClass:Notification, public analytics:Analytics, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public events:Events, public keyboard:Keyboard, public network:Network, public user:User, public validator:Validator) {
            network.onConnect().subscribe(()=>{
                  this.online = true;
            });
            network.onDisconnect().subscribe(()=>{
                  this.online = false;
            });
      }

      ngOnInit():void {
            console.log("~ MessagecardComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.activity = Observable.of(true);
            this.twinerClass.getTwinerById(this.other, (other)=>{
                  this.placeholderText = Observable.of("Write a message..." || "An error occured.");
                  console.log("Placeholder text set to: " + this.placeholderText);
            });
            Observable.timer(500).take(1).subscribe(()=>{
                  this.events.publish('messages:toBottom');
            });
            console.log("- ngOnInit Resolved -");
      }

      message():void {
            console.log("- message Starting -");
            this.text = this.validator.validator(this.text);
            var text = this.text;
            console.log("Trimmed text to: " + text);
            if (text && text != '') {
                  console.log("Text is not blank");
                  this.user.getUser((user)=>{
                        var message = {
                              date: Date.now(),
                              text: text,
                              id: user.id
                        };
                        console.log("Got user ID from storage: " + user.id);
                        this.twineClass.getTwineById(this.id, (twine)=>{
                              var messages = twine.messages;
                              this.notificationClass.pushMessageNotification((twine.twinee1.id == user.id ? twine.twinee2.id : twine.twinee1.id), user.id, twine.id, text);
                              console.log("Loaded messages from twine " + this.id + ": " + messages);
                              messages.push(message);
                              console.log("Pushed message: " + message);
                              this.db.object('/twines/' + this.id + '/messages').set(messages).then(()=>{
                                    console.log("Updated message list for twine " + this.id);
                                    this.events.publish('messages:toBottom');
                                    console.log("Set text to blank");
                              }).catch(()=>{
                                    console.error("Could not update message list for twine " + this.id);
                              });
                        });
                  });
            }
            console.log("- message Resolved -");
      }
}
