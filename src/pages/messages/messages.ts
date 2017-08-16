import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Content, Events } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxJS';

import { FB } from '../../classes/fb';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';
import { Analytics } from '../../classes/analytics';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
  providers: [FB, Alert, User, Analytics]
})
export class MessagesPage implements OnInit {
      @ViewChild(Content) content: Content;
      id:any = this.navParams.get('id');
      twinee:FirebaseListObservable<any> = this.navParams.get('twinee');
      twiner:FirebaseListObservable<any> = this.navParams.get('twiner');
      keyboardOpen:Observable<any>;

      userData:any;
      messages:any = [];
      QUERY_INTERVAL = 5;
      queryCount:number = 10;

      loading:boolean = true;
      end:boolean = true;

      constructor(private keyboard:Keyboard, public navCtrl: NavController, public alert:Alert, public navParams:NavParams, public db: AngularFireDatabase, public fb:FB, public events:Events, public user:User, public analytics:Analytics) {
            events.subscribe('messages:toBottom', () =>{
                  this.bottomScroll();
            });
            this.db.list('/twines/' + this.id + '/messages/').subscribe(()=>{
                  this.bottomScroll(100);
            });
      }

      ngOnInit():void {
            console.log("* MessagesPage Opened *");
            console.log("- ngOnInit Started -");
            this.navCtrl.swipeBackEnabled = false;
            this.loadMessages(() => {
                  this.bottomScroll(300, () => {
                        this.loading = false;
                        this.end = false;
                  });
            });
            console.log("Set messages observable from twine " + this.id);
            console.log("- ngOnInit Resolved -");
      }

      ionViewDidEnter():void {
            this.analytics.setScreenTo('messages');
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

      loadMessages(callback:any = null):void {
            this.extendMessages(0, () => {
                  if (callback) {callback();}
            })
      }

      extendMessages(count:number, callback:any = undefined):void {
            this.db.list('/twines/' + this.id + '/messages/', {
                  query: {
                        orderByKey: true,
                        limitToLast: this.queryCount + count
                  }
            }).subscribe((messages)=>{
                  this.queryCount = messages.length;
                  this.messages = messages.length > 0 ? messages : [];
                  if (callback) {callback();}
            });
      }

      infiniteScroll(infiniteScroll):void {
            if (this.loading == false) {
                  this.loading = true;
                  this.extendMessages(this.QUERY_INTERVAL, ()=>{
                        this.bottomScroll(500);
                        Observable.timer(2000).take(1).subscribe(()=>{
                              infiniteScroll.complete();
                              this.bottomScroll(0);
                              this.loading = false;
                        });
                  });
            }
      }

      toTwines():void {
            console.log("- toTwines Started -");
            this.navCtrl.pop({
                  animate: true,
                  animation: "wp-transition",
                  duration: 250
            }).then(()=>{
                  console.log("Opening TwinesPage");
            }).catch((e)=>{
                  console.error("Could open TwinesPage: " + e);
            });
            console.log("- toTwines Resolved -");
      }

      toFacebookURL():void {
            this.twinee.take(1).subscribe((twinee)=>{
                  this.alert.showAlert('Proceed to Facebook?', 'This will open ' + twinee.name + '\'s profile in the In-App Browser.', 'Proceed',
                        () => {
                              this.fb.openFacebookProfile(twinee.id);
                        });
            });
      }
}
