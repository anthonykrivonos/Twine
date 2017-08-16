import { Component, Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { Alert } from '../classes/alert';
import { User } from '../classes/user';

import { Observable } from 'rxJS';

@Injectable()
@Component({
  providers: [User, Alert]
})
export class Analytics {
      app:any;
      blocks:number;
      comments_per_twine:any;
      messages_per_twine:any;
      starter_count:number;
      twine_privacies:any;
      twine_responses:any;
      twines_in:number;
      twines_liked:number;
      twines_made:number;

      constructor(public alert: Alert, public user: User, public events:Events, public firebaseAnalytics:FirebaseAnalytics) {
            events.subscribe('analytics', () => {

            });
      }

      enable(enabled:any = null, disabled:any = null):void {
            this.alert.showAlertWithOptions("Enable Analytics?", "Analytics help us understand how you use Twine so we can improve it!", "Yes", "No", () => {
                  this.firebaseAnalytics.setEnabled(true).then(()=>{if(enabled) {enabled()}}).catch();
            }, () => {
                  this.firebaseAnalytics.setEnabled(false).then(()=>{if(disabled) {disabled()}}).catch();
            }, "primary");
      }

      setUser(id:any, name:string, original_name:string, date_joined:string, score:any = 0):void {
            this.firebaseAnalytics.setUserId(id);
            this.firebaseAnalytics.setUserProperty('name', name);
            this.firebaseAnalytics.setUserProperty('original_name', original_name);
            this.firebaseAnalytics.setUserProperty("date_joined", date_joined);
            this.firebaseAnalytics.setUserProperty("score", score);
      }

      setScreenTo(name:string, callback:any = undefined) {
            this.firebaseAnalytics.setCurrentScreen(name).then(()=>{
                  if (callback) {callback();}
            }).catch(()=>{});
      }

<<<<<<< HEAD
      setMessagesPerTwine(messages_per_twine:any):any {
            this.messages_per_twine = messages_per_twine;
            this.updateAnalytics();
            return messages_per_twine;
      }

      setMessagesPerTwineArgs(twine:any, messages:any):any {
            this.messages_per_twine[twine] = messages;
            this.updateAnalytics();
            return this.messages_per_twine;
      }

      setStarterCount(starter_count:number):number {
            this.starter_count = starter_count;
            this.updateAnalytics();
            return starter_count;
      }

      setTwinePrivacies(twine_privacies:any):any {
            this.twine_privacies = twine_privacies;
            this.updateAnalytics();
            return twine_privacies;
      }

      setTwinePrivates(privates:number):number {
            this.twine_privacies.private = privates;
            this.updateAnalytics();
            return privates;
      }

      setTwinePublics(publics:number):number {
            this.twine_privacies.public = publics;
            this.updateAnalytics();
            return publics;
      }

      setTwineResponses(twine_responses:any):any {
            this.twine_responses = twine_responses;
            this.updateAnalytics();
            return twine_responses;
      }

      setTwineAccepted(accepted:number):number {
            this.twine_responses.accepted = accepted;
            this.updateAnalytics();
            return accepted;
      }

      setTwineDeclined(declined:number):number {
            this.twine_responses.declined = declined;
            this.updateAnalytics();
            return declined;
      }

      setTwinesIn(twines_in:number):number {
            this.twines_in = twines_in;
            this.updateAnalytics();
            return this.twines_in;
      }

      setTwinesLiked(twines_liked:number):number {
            this.twines_liked = twines_liked;
            this.updateAnalytics();
            return this.twines_liked;
      }

      setTwinesMade(twines_made:number):number {
            this.twines_made = twines_made;
            this.updateAnalytics();
            return this.twines_made;
      }

      setAnalyticsFromObject(analytics:any):any {
            this.setApp(analytics.app || new Object());
            this.setClicks(analytics.app.clicks || 0);
            this.setLogins(analytics.app.logins || 0);
            this.setLogouts(analytics.app.logouts || 0);
            this.setBlocks(analytics.blocks || 0);
            this.setCommentsPerTwine(analytics.comments_per_twine || new Object());
            this.setMessagesPerTwine(analytics.messages_per_twine || new Object());
            this.setStarterCount(analytics.starter_count || 0);
            this.setTwinePrivacies(analytics.twine_privacies || new Object());
            this.setTwinePrivates(analytics.twine_privacies.private || 0);
            this.setTwinePublics(analytics.twine_privacies.public || 0);
            this.setTwineResponses(analytics.twine_responses || new Object());
            this.setTwineAccepted(analytics.twine_responses.accepted || 0);
            this.setTwineDeclined(analytics.twine_responses.declined || 0);
            this.setTwinesIn(analytics.twines_in || 0);
            this.setTwinesLiked(analytics.twines_liked || 0);
            this.setTwinesMade(analytics.twines_made || 0);
            return this.getAnalytics();
      }

      loginAnalytics(callback:any = undefined):any {
            this.user.getUser((user) => {
                  this.twinerClass.getTwinerById(user.id, (twiner) => {
                        this.setApp(this.getApp());
                        this.incClicks();
                        this.setBlocks(twiner.blocked ? twiner.blocked.length : 0);
                        this.updateAnalytics();
                        if (twiner.twines) {
                              var starterCount = 0;
                              var privates = 0;
                              var publics = 0;
                              this.setTwinesIn(twiner.twines.length);
                              twiner.twines.forEach((tw) => {
                                    this.twineClass.getTwineById(tw, (t)=>{
                                          if (t.messages) {this.setMessagesPerTwineArgs(t.id, t.messages.length);}
                                          if (t.conversation_starter != "") {this.setStarterCount(++starterCount);}
                                          if (t.privacy == "public") {this.setTwinePublics(++publics);}
                                          else {this.setTwinePrivates(++privates);}
                                    });
                              })
                        }
                  })
=======
      twineEvent(event:string, twineId:string):void {
            this.firebaseAnalytics.logEvent(event, {
                  count: 1,
                  twine: twineId
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
            });
      }

      eventClick():void {
            this.firebaseAnalytics.logEvent('click', 1)
      }

      eventLogin():void {
            this.firebaseAnalytics.logEvent('login', 1)
      }

      eventLogout():void {
            this.firebaseAnalytics.logEvent('logout', 1)
      }

      eventLike(twineId:string):void {
            this.twineEvent('like', twineId);
      }

      eventUnlike(twineId:string):void {
            this.twineEvent('unlike', twineId);
      }

      eventMessage(twineId:string):void {
            this.twineEvent('message', twineId);
      }

      eventComment(twineId:string):void {
            this.twineEvent('comment', twineId);
      }

      eventDeleteComment(twineId:string):void {
            this.twineEvent('delete_comment', twineId);
      }

      eventStarter(twineId:string):void {
            this.twineEvent('conversation_starter', twineId);
      }

      eventAccept(twineId:string):void {
            this.twineEvent('twine_accept', twineId);
      }

      eventDecline(twineId:string):void {
            this.twineEvent('twine_decline', twineId);
      }
}
