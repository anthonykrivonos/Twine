import { Injectable, Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { User } from '../classes/user';

@Injectable()
@Component({
  providers: [User]
})
export class Score {
      MADE_MULTIPLIER:number = 10;
      STARTERS_MULTIPLIER:number = 5;
      LIKED_MULTIPLIER:number = 1;
      COMMENTED_MULTIPLIER:number = 2;

      twinesMade:any;
      twinesLiked:any;
      twineComments:any;
      starterCount:any;
      score:any;

      constructor(public db:AngularFireDatabase, public user:User) {
            user.getUser((user) => {
                  this.score = db.object('twiners/' + user.id + '/score/score');
                  this.twinesMade = db.object('twiners/' + user.id + '/score/twines_made');
                  this.twinesLiked = db.object('twiners/' + user.id + '/score/twines_liked');
                  this.twineComments = db.object('twiners/' + user.id + '/score/twine_comments');
                  this.starterCount = db.object('twiners/' + user.id + '/score/starter_count');
            });
      }

      calculateScore(made:number, starters:number, liked:number, commented:number):number {
            return (made * this.MADE_MULTIPLIER) + (starters * this.STARTERS_MULTIPLIER)
                  + (liked * this.LIKED_MULTIPLIER) + (commented + this.COMMENTED_MULTIPLIER);
      }

      generateScore(callback:any):void {
            this.getAll((scoreObj)=>{
                  callback(this.calculateScore(scoreObj.twines_made, scoreObj.starter_count, scoreObj.twines_liked, scoreObj.twine_comments));
            });
      }

      updateScore():void {
            this.generateScore((score) => {
                  this.score.set(score).catch();
            });
      }

      getScoreAsObject(isEmpty:boolean = false, callback:any = null):any {
            if (!isEmpty && callback) {
                  this.getAll((scoreObj)=>{
                        callback({
                              score: scoreObj.score || 0,
                              twines_made: scoreObj.twines_made || 0,
                              starter_count: scoreObj.starter_count || 0,
                              twines_liked: scoreObj.twines_liked || 0,
                              twine_comments: scoreObj.twine_comments || 0
                        });
                  });
            } else {
                  var obj = {
                        score: 0,
                        twines_made: 0,
                        starter_count: 0,
                        twines_liked: 0,
                        twine_comments: 0
                  };
                  if (callback) {callback(obj);}
                  return obj;
            }
      }

      getAll(callback:any):void {
            this.getScore((score) => {
                  this.getTwinesMade((twines_made)=>{
                        this.getStarterCount((starter_count) => {
                              this.getTwinesLiked((twines_liked) => {
                                    this.getTwineComments((twine_comments) => {
                                          callback({
                                                score,
                                                twines_made,
                                                starter_count,
                                                twines_liked,
                                                twine_comments
                                          });
                                    });
                              });
                        });
                  });
            });
      }

      getScore(callback:any):void {
            this.score.take(1).subscribe((score) => {
                  callback(score.$value || 0);
            });
      }

      getTwinesMade(callback:any):void {
            this.twinesMade.take(1).subscribe((twines_made) => {
                  callback(twines_made.$value || 0);
            });
      }

      getStarterCount(callback:any):void {
            this.starterCount.take(1).subscribe((starter_count) => {
                  callback(starter_count.$value || 0);
            });
      }

      getTwinesLiked(callback:any):void {
            this.twinesLiked.take(1).subscribe((twines_liked) => {
                  callback(twines_liked.$value || 0);
            });
      }

      getTwineComments(callback:any):void {
            this.twineComments.take(1).subscribe((twine_comments) => {
                  callback(twine_comments.$value || 0);
            });
      }

      increaseTwinesMade():void {
            this.twinesMade.take(1).subscribe((twines_made) => {
                  this.twinesMade.set(twines_made.$value || twines_made.$value == 0 ? ++twines_made.$value : 1).then(()=>{
                        this.updateScore();
                  }).catch();
            });
      }

      increaseStarterCount():void {
            this.starterCount.take(1).subscribe((starter_count) => {
                  this.starterCount.set(starter_count.$value || starter_count.$value == 0 ? ++starter_count.$value : 1).then(()=>{
                        this.updateScore();
                  }).catch();
            });
      }

      increaseTwinesLiked():void {
            this.twinesLiked.take(1).subscribe((twines_liked) => {
                  this.twinesLiked.set(twines_liked.$value || twines_liked.$value == 0 ? ++twines_liked.$value : 1).then(()=>{
                        this.updateScore();
                  }).catch();
            });
      }

      decreaseTwinesLiked():void {
            this.twinesLiked.take(1).subscribe((twines_liked) => {
                  this.twinesLiked.set(twines_liked.$value && twines_liked.$value > 0 ? --twines_liked.$value : 0).then(()=>{
                        this.updateScore();
                  }).catch();
            });
      }

      increaseTwineComments():void {
            this.twineComments.take(1).subscribe((twine_comments) => {
                  this.twineComments.set(twine_comments.$value || twine_comments.$value == 0 ? ++twine_comments.$value : 1).then(()=>{
                        this.updateScore();
                  }).catch();
            });
      }

      decreaseTwineComments():void {
            this.twineComments.take(1).subscribe((twine_comments) => {
                  this.twineComments.set(twine_comments.$value && twine_comments.$value > 0 ? --twine_comments.$value : 0).then(()=>{
                        this.updateScore();
                  }).catch();
            });
      }
}
