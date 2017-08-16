import { Component, Input, OnInit } from '@angular/core';

import { Twiner } from '../../classes/twiner';
import { Toast } from '../../classes/toast';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';

import { Observable } from 'rxJS';

import { NativeStorage } from '@ionic-native/native-storage';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'twine-blockcard',
  templateUrl: 'blockcard.html',
  providers: [Twiner, Toast, Alert, User]
})
export class BlockcardComponent implements OnInit {
      @Input() id;

      userData:any;

      picture:Observable<any>;
      name:Observable<any>;
      background:Observable<any>;
      color:Observable<any>;
      blocked:Observable<boolean>;

      nameStr:string;
      blockedBool:boolean;

      constructor(public twinerClass:Twiner, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public alert:Alert, public toast:Toast, public user:User){
            console.log("~ BlockcardComponent Loaded ~");
            console.log("- BlockcardComponent Constructor -");
            console.log("- BlockcardComponent Resolved -")
      }

      ngOnInit():void {
            this.twinerClass.getTwinerObservableById(this.id).subscribe((blockee) => {
                  this.picture = Observable.of(blockee.picture);
                  this.name = Observable.of(blockee.name);
                  this.nameStr = blockee.name;
                  this.user.getUser((user) => {
                        this.userData = user;
                        this.twinerClass.getTwinerById(this.userData.id, (tw) => {
                              var blocked = JSON.parse(JSON.stringify(tw.blocked || []));
                              console.log("Got list of blocked users: " + JSON.stringify(blocked));
                              if (blocked) {
                                    var includes = !blocked.includes(this.id) || false;
                                    this.blocked = Observable.of(includes);
                                    this.blockedBool = includes;
                                    this.background = Observable.of(includes ? "white" : "#F3F3F3");
                                    this.color = Observable.of(includes ? "#515151" : "#D3D3D3");
                                    console.log("Set observables");
                              }
                        });
                  });
            });
      }

      block():void {
            console.log("- block Starting -")
            this.blocked.take(1).subscribe((blocked)=>{
                  this.blocked = Observable.of(blocked ? false : true);
                  this.blockedBool = blocked ? false : true;
                  this.background = Observable.of(blocked ? "#F3F3F3" : "white");
                  this.color = Observable.of(blocked ? "#D3D3D3" : "#515151");
                  this.twinerClass.block(this.userData.id, this.id);
            });
            console.log("- block Resolved -")
      }

      checkBlock():void {
            this.alert.showAlert((this.blockedBool ? 'Block ' : 'Unblock ')  + this.nameStr + '?', 'You may ' + (this.blockedBool ? 'unblock ' : 'block ') + this.nameStr + ' at any time.',
                  (this.blockedBool ? 'Block' : 'Unblock'), () => {
                        this.block();
                        this.toast.showToast('top', 'You just ' + (this.blockedBool ? 'unblock' : 'block') + 'ed ' + this.nameStr + '.', 'secondary');
                  });
      }
}
