import { Component, Input } from '@angular/core';

import { Twiner } from '../../classes/twiner';
import { Twine } from '../../classes/twine';
import { Toast } from '../../classes/toast';
import { Alert } from '../../classes/alert';
import { User } from '../../classes/user';

import { Observable } from 'rxJS';

import { NativeStorage } from '@ionic-native/native-storage';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'twine-hidecard',
  templateUrl: 'hidecard.html',
  providers: [Twiner, Twine, Toast, Alert, User]
})
export class HidecardComponent {
      @Input() id;

      userData:any

      picture:Observable<any>;
      name:Observable<any>;

      nameStr:string;

      constructor(public twinerClass:Twiner, public twineClass:Twine, public db: AngularFireDatabase, public nativeStorage:NativeStorage, public alert:Alert, public toast:Toast, public user:User){
            console.log("~ HidecardComponent Loaded ~");
            console.log("- HidecardComponent Constructor -")
            this.user.getUser((user) => {
                  this.userData = user;
                  this.twineClass.getTwineById(this.id, (twine) => {
                        if (twine.twinee1.id == user.id) {
                              this.twinerClass.getTwinerById(twine.twinee2.id, (hiddenUser) => {
                                    this.picture = Observable.of(hiddenUser.picture);
                                    this.name = Observable.of(hiddenUser.name);
                                    this.nameStr = hiddenUser.name;
                              });
                        } else {
                              this.twinerClass.getTwinerById(twine.twinee1.id, (hiddenUser) => {
                                    this.picture = Observable.of(hiddenUser.picture);
                                    this.name = Observable.of(hiddenUser.name);
                                    this.nameStr = hiddenUser.name;
                              });
                        }
                  });
            });
            console.log("- HidecardComponent Resolved -")
      }

      unhide():void {
            console.log("- block Starting -")
            this.user.getUser((user) => {
                  this.twinerClass.unhide(user.id, this.id, () => {
                        this.twineClass.getTwineById(this.id, (twine)=>{
                              twine.twinee1.id == user.id ? this.twineClass.unhide(twine.id, 1) : this.twineClass.unhide(twine.id, 2);
                        });
                  });
            });
            console.log("- block Resolved -")
      }

      checkHide():void {
            this.alert.showAlert('Unhide Conversation?', 'All your messages with '  + this.nameStr + ' will be restored.', 'Unhide', () => {
                  this.unhide();
                  this.toast.showToast('top', 'Unhid all your messages with '  + this.nameStr + '.', 'secondary');
            });
      }
}
