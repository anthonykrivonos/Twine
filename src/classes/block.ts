import { Injectable, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class Block implements OnInit {

      constructor(public nativeStorage: NativeStorage, public events:Events, public db:AngularFireDatabase) {

      }

      ngOnInit():void {
            
      }

      checkBlock(id:any, blockee:any, callback:any):void {

      }



}
