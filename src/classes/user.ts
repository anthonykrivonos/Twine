import { Injectable, Component } from '@angular/core';
import { IonicPage, IonicModule } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class User {

      constructor(public nativeStorage: NativeStorage) {}

      storeUser(user:any, success:any = null, failure:any = null):void {
            this.nativeStorage.setItem('user', user).then((user) => {
                  if (success) {success(user);}
            }).catch((e) => {
                  if (failure) {failure(e);}
            });
      }

      getUser(success:any = null, failure:any = null):void {
            this.nativeStorage.getItem('user').then((user) => {
                  if (success) {success(user);}
            }).catch((e) => {
                  if (failure) {failure(e);}
            });
      }

      unStoreUser(success:any = null, failure:any = null):void {
            this.nativeStorage.remove('user').then((user) => {
                  if (success) {success(user);}
            }).catch((e) => {
                  if (failure) {failure(e);}
            });
      }
}
