import { Component, Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { Configuration } from '../classes/configuration';
import { Vibration } from '../classes/vibration';
import { User } from '../classes/user';

@Injectable()
@Component({
  providers: [ToastController, Configuration, Vibration, User]
})
export class Toast {
      DURATION = 2000;

      vibrate:boolean = false;

      constructor(private toastCtrl:ToastController, public configuration:Configuration, public vibration:Vibration, public user:User) {}

      showToast(position:string, message:string, color:string = 'primary') {
            let toast = this.toastCtrl.create({
                  message: message,
                  duration: this.DURATION,
                  position: position || 'top',
                  cssClass: `toast-${(color == 'primary' || color == 'secondary' ? color : 'primary')}`
            });
            toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
            });
            this.user.getUser((user) => {
                  this.configuration.checkVibration(user.id, (vibrate)=>{
                        if (vibrate) {this.vibration.vibrationResponsive()}
                        toast.present();
                  });
            });
      }
}
