import { Component, Injectable, ViewChild, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NativeStorage } from '@ionic-native/native-storage';

import { Observable, Observer } from 'rxJS';

import { Twiner } from '../../classes/twiner';

@Component({
  selector: 'twine-feed',
  templateUrl: 'feed.html',
  providers: [Twiner]
})
@Injectable()
export class FeedComponent implements OnInit {
      @Input('user') user;
      feed:any = [];

      QUERY_INTERVAL = 5;
      queryCount:number = 5;
      end:boolean = false;

      constructor(public db: AngularFireDatabase, public twinerClass:Twiner) {}

      ngOnInit():void {
            console.log("~ FeedComponent Loaded ~");
            console.log("- ngOnInit Starting -");
            this.loadFeed();
            console.log("- ngOnInit Resolved -");
      }

      extendFeed(count:number, callback:any = undefined):void {
            this.db.list('/twiners/' + this.user.id + '/feed', {
                  query: {
                        orderByKey: true,
                        startAt: `${this.queryCount}`,
                        endAt: `${this.queryCount += count}`
                  }
            }).map((array) => array.reverse()).subscribe((feed)=>{
                  feed.length > 0 ? feed.forEach((f)=>{this.feed.push(f)}) : this.end = true;
                  Observable.timer(1000).take(1).subscribe(()=>{
                        if (callback) {callback();}
                  })
            });
      }

      infiniteScroll(infiniteScroll):void {
            this.extendFeed(this.QUERY_INTERVAL, ()=>{
                  infiniteScroll.complete();
            });
      }

      loadFeed():void {
            this.feed = [];
            this.twinerClass.getFeedById(this.user.id, (feed) => {
                  feed.forEach((f)=>{
                        if (!this.feed.includes(f)) {
                              this.feed.unshift(f);
                        }
                  })
            });
      }
}
