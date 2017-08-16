import { Component, Input, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxJS';
import { MessagesPage } from '../messages/messages';

import { Twine } from '../../classes/twine';
import { Twiner } from '../../classes/twiner';
import { Analytics } from '../../classes/analytics';
<<<<<<< HEAD
import { Global } from '../../classes/global';
=======
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53

@Component({
      selector: 'page-twines',
      templateUrl: 'twines.html',
<<<<<<< HEAD
      providers: [Twine, Twiner, Analytics, Global]
=======
      providers: [Twine, Twiner, Analytics]
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
})
export class TwinesPage implements OnInit {
      user:any = this.navParams.get('user');

      search:string = "";

      invitations:Observable<any>;
      twines:Observable<any>;
      twinesExt:Observable<any>;

      twineeArr:any;

<<<<<<< HEAD
      constructor (public navParams:NavParams, public navCtrl: NavController, public db: AngularFireDatabase, public twineClass:Twine, public twinerClass:Twiner, public menuCtrl:MenuController, public global:Global, public analytics:Analytics) {
            global.twines('sort', () => {
=======
      constructor (public navParams:NavParams, public navCtrl: NavController, public db: AngularFireDatabase, public twineClass:Twine, public twinerClass:Twiner, public menuCtrl:MenuController, public events:Events, public analytics:Analytics) {
            events.subscribe('sort:twines', () => {
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                  this.sortLists();
            });
      }

      ngOnInit():void {
            console.log("* TwinesPage Opened *");
            console.log("- ngOnInit Started -");
            console.log("Loading Twines")
            console.log("- ngOnInit Resolved -");
      }

      ionViewWillEnter():void {
            this.searchTwines();
      }

      ionViewDidEnter():void {
            this.analytics.setScreenTo('twines');
      }

      toMain():void {
            console.log("- toMain Started -");
            this.navCtrl.pop({
                  animate: true,
                  animation: "wp-transition",
                  duration: 250
            }).then(()=>{
                  console.log("Opening MainPage");
            }).catch((e)=>{
                  console.error("Could open MainPage: " + e);
            });
      }

      searchTwines():void {
            this.invitations = this.findItem('invitations');
            this.twines = this.findItem('twines');
            this.sortLists();
      }

      findItem(list:string): Observable<any> {
            console.log("- find Started and Resolved -");
            return this.db.list('/twiners/' + this.user.id + '/' + list)
                  .switchMap(twines => {
                        let arrayOfObservables = twines.map(tw => {
                              return this.twineClass.getTwineObservableById(tw.$value)
                                    .take(1)
                                    .switchMap((twine) => {
                                          var id = (twine.twinee1.id != this.user.id ? twine.twinee1.id : twine.twinee2.id)
                                          return this.twinerClass.getTwinerObservableById(id)
                                              .take(1)
                                              .map(twinee => {
                                                  return twinee && twinee.name.toLowerCase().startsWith(this.search.toLowerCase()) ? tw : null;
                                              })
                                    });
                        });
                        return Observable.forkJoin(...arrayOfObservables).filter(x => x != null).map((array) => array.reverse());
                  });
      }

      orderByTime(obs:Observable<any>):Observable<any> {
            console.log("- orderByTime Started and Resolved -");
            if (!obs) {return Observable.of("");}
            return obs
                  .switchMap(twines => {
                        let arrayOfObservables = twines.map(tw => {
                              return tw != null ? this.twineClass.getTwineObservableById(tw.$value)
                                    .take(1)
                                    .switchMap((twine) => {
                                          return Observable.of({
                                                time: twine.messages[twine.messages.length - 1].date || 0,
                                                id: tw.$value
                                          });
                                    }) :  Observable.of(null);
                        });
                        return Observable.forkJoin(...arrayOfObservables).filter(x => x != null);
                  });
      }

      sortLists():void {
            console.log("Sorting lists");
            this.orderByTime(this.twines).subscribe((twines)=>{
                  if (twines) {
                        twines = twines.filter(t => t != null)
                        .sort((t1, t2) => {
                              console.log("Sorting twine #" + t1.id);
                              return t2.time - t1.time || t1.time;
                        }).map(t => {
                              return {$value: t.id};
                        });
                  } else {
                        twines = [];
                  }
                  this.twines = Observable.of(twines);
            });
            this.orderByTime(this.invitations).subscribe((invitations)=>{
                  if (invitations) {
                        invitations = invitations.filter(i => i != null)
                        .sort((i1, i2) => {
                              return i2.time - i1.time || i1.time;
                        }).map(i => {
                              return {$value: i.id};
                        });
                  } else {
                        invitations = [];
                  }
                  this.invitations = Observable.of(invitations);
            });
      }

      toMenu():void {
            console.log("- toMenu Starting -");
<<<<<<< HEAD
            this.global.menu('open');
=======
            this.events.publish('menuOpen:click');
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
            this.navCtrl.pop({
                  animate: true, animation: "wp-transition",
                  duration: 100
            }).then(() => {
                  this.menuCtrl.open().then(()=>{
                        console.log("Opened menu")
                  }).catch(()=>{
                        console.error("Could not open menu");
                  });
            });
            console.log("- toMenu Resolved -");
      }
}
