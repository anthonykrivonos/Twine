import { Injectable, OnInit, Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { User } from '../classes/user';
import { Twine } from '../classes/twine';
import { Twiner } from '../classes/twiner';

@Injectable()
@Component({
  providers: [User, Twine, Twiner]
})
export class Configuration implements OnInit {
      onboardingShow:boolean;
      loggedIn:boolean;
      vibration:boolean;
      notifications:any;

      constructor(public events:Events, public db:AngularFireDatabase, public user:User, public twineClass:Twine, public twinerClass:Twiner) {
            events.subscribe('config', () => {
                  this.loadConfiguration();
            });
      }

      ngOnInit():void {
            this.loadConfiguration();
      }

      checkPush(id:string, type:string, callback:any):void {
            this.db.object('/twiners/' + id + '/config/notifications/').take(1).subscribe((notif) => {
                  if (type == null) { callback(); }
                  else if (type == "twine") { if (notif.twines) { callback(); } }
                  else if (type == "comment") { if (notif.comments) { callback(); } }
                  else if (type == "like") { if (notif.likes) { callback(); } }
                  else if (type == "message") { if (notif.messages) { callback(); } }
            });
      }

      checkVibration(id:string, callback:any):void {
            this.db.object('/twiners/' + id + '/config/vibration/').subscribe((vibration) => {
                  if (vibration.$value) { callback(vibration.$value == true); }
                  else { callback(false); }
            });
      }

      loadConfiguration(callback:any = null):void {
            console.log("Checking for config file");
            this.user.getUser((user) => {
                  this.twinerClass.getConfigurationById(user.id, (config)=>{
                        console.log("Got config: " + JSON.stringify(config, null, 2));
                        if (config.$value != null || config != null) {
                              this.setConfigurationFromObject(config);
                              if (callback) { callback(config); }
                        } else {
                              this.resetConfiguration();
                        }
                  })
            });
      }

      updateConfiguration(callback:any = null):any {
            this.user.getUser((user) => {
                  this.db.object('/twiners/' + user.id + '/config/').set(this.getConfiguration()).then(()=>{
                        console.log("Set config details for user: " + JSON.stringify(this.getConfiguration(), null, 2));
                        if (callback) { callback(); }
                  });
            });
      }

      getConfiguration():any {
            return {
                  onboardingShow: this.getOnBoardingShow(),
                  loggedIn: this.getLoggedIn(),
                  vibration: this.getVibration(),
                  notifications: this.getNotifications()
            };
      }

      getOnBoardingShow():boolean { return this.onboardingShow; }

      getLoggedIn():boolean { return this.loggedIn; }

      getVibration():boolean { return this.vibration; }

      getNotifications():any { return this.notifications; }

      getTwinesNotifications():boolean { return this.notifications.twines; }

      getMessagesNotifications():boolean { return this.notifications.messages; }

      getLikesNotifications():any { return this.notifications.messages; }

      getCommentsNotifications():any { return this.notifications.messages; }

      setOnBoardingShow(onboardingShow:boolean):boolean {
            this.onboardingShow = onboardingShow;
            this.updateConfiguration();
            return onboardingShow;
      }

      setLoggedIn(loggedIn:boolean):boolean {
            this.loggedIn = loggedIn;
            this.updateConfiguration();
            return loggedIn;
      }

      setVibration(vibration:boolean):boolean {
            this.vibration = vibration;
            this.updateConfiguration();
            return vibration;
      }

      setNotifications(notifications:any):any {
            this.notifications = notifications;
            this.updateConfiguration();
            return notifications;
      }

      setTwinesNotifications(twines:boolean):boolean {
            console.log("Notifications: " + JSON.stringify(this.notifications, undefined, 2));
            console.log("Twines: " + twines);
            this.notifications.twines = twines;
            this.updateConfiguration();
            return twines;
      }

      setMessagesNotifications(messages:boolean):boolean {
            this.notifications.messages = messages;
            this.updateConfiguration();
            return messages;
      }

      setLikesNotifications(likes:boolean):boolean {
            this.notifications.likes = likes;
            this.updateConfiguration();
            return likes;
      }

      setCommentsNotifications(comments:boolean):boolean {
            this.notifications.comments = comments;
            this.updateConfiguration();
            return comments;
      }

      setConfigurationFromObject(config:any):any {
            this.setOnBoardingShow(config.onboardingShow);
            this.setLoggedIn(config.loggedIn);
            this.setVibration(config.vibration);
            this.setNotifications(config.notifications);
            return this.getConfiguration();
      }

      setSameConfiguration(config:any):any {
            this.setOnBoardingShow(config);
            this.setLoggedIn(config);
            this.setVibration(config);
            this.setNotifications({
                  twines: config,
                  messages: config,
                  likes: config,
                  comments: config
            });
            this.setTwinesNotifications(config);
            this.setMessagesNotifications(config);
            this.setLikesNotifications(config);
            this.setCommentsNotifications(config);
            return this.getConfiguration();
      }

      resetConfiguration():any {
            this.setOnBoardingShow(false);
            this.setLoggedIn(true);
            this.setVibration(true);
            this.resetNotifications();
            return this.getConfiguration();
      }

      resetNotifications():any {
            this.setNotifications({
                  twines: true,
                  messages: true,
                  likes: true,
                  comments: true
            });
            return this.getConfiguration();
      }

      hideOnboarding():void {
            this.setOnBoardingShow(false);
            return this.getConfiguration();
      }

      logConfiguration():void { console.log(JSON.stringify(this.getConfiguration()), undefined, 2); }
}
