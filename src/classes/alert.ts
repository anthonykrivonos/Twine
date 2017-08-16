import { Component, Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Configuration } from '../classes/configuration';
import { Vibration } from '../classes/vibration';
import { User } from '../classes/user';

@Injectable()
@Component({
  providers: [AlertController, Configuration, Vibration, User]
})
export class Alert {

      constructor(private alertCtrl:AlertController, public configuration:Configuration, public vibration:Vibration, public user:User) {}

      showAlert(title:string, message:string, confirm:string, confirmed:any = null, cancelled:any = null, color:string = 'primary'):void {
            this.showAlertWithOptions(title, message, confirm, 'Cancel', confirmed, cancelled);
      }

      showAlertWithOptions(title:string, message:string, confirm:string, cancel:string, confirmed:any = null, cancelled:any = null, color:string = 'primary'):void {
            let alert = this.alertCtrl.create({
                  title: title,
                  message: message,
                  cssClass: `alert-${(color == 'primary' || color == 'secondary' ? color : 'primary')}`,
                  buttons: [
                        {
                              text: cancel,
                              role: 'cancel',
                              handler: () => {
                                    if (cancelled) {cancelled();}
                                    console.log('Cancel clicked');
                              }
                        },
                        {
                              text: confirm,
                              handler: () => {
                                    if (confirmed) {confirmed();}
                                    console.log(confirm + ' clicked');
                              }
                        }
                  ]
            });
            this.user.getUser((user) => {
                  this.configuration.checkVibration(user.id, (vibrate)=>{
                        if (vibrate) {this.vibration.vibrationShort()}
                        alert.present();
                  });
            });
      }
}
