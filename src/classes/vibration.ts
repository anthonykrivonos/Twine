import { Injectable } from '@angular/core';
import { IonicPage, IonicModule } from 'ionic-angular';

import { Vibration as Vibrate} from '@ionic-native/vibration';

import { Observable } from 'rxJS';

@Injectable()
export class Vibration {

      DEBUG = true;

      RESPONSIVE_VIBRATION = 1;
      SHORT_VIBRATION = 100;
      MEDIUM_VIBRATION = 200;
      LONG_VIBRATION = 400;
      EXTRA_VIBRATION = 600;

      constructor(public vibrate:Vibrate) {}

      vibration(duration:any, callback:any = null):void {
            this.vibrate.vibrate(0);
            this.vibrate.vibrate(duration);
            Observable.timer(duration).take(1).subscribe(()=>{
                  if (this.DEBUG) {console.log(`Vibrated for ${duration}ms`)}
                  if (callback) {callback()}
            });
      }

      vibrationResponsive(callback:any = null):void {
            this.vibration(this.RESPONSIVE_VIBRATION, () => {
                  if (callback) {callback();}
            });
      }

      vibrationShort(callback:any = null):void {
            this.vibration(this.SHORT_VIBRATION, () => {
                  if (callback) {callback();}
            });
      }

      vibrationMedium(callback:any = null):void {
            this.vibration(this.MEDIUM_VIBRATION, () => {
                  if (callback) {callback();}
            });
      }

      vibrationLong(callback:any = null):void {
            this.vibration(this.LONG_VIBRATION, () => {
                  if (callback) {callback();}
            });
      }

      vibrationExtra(callback:any = null):void {
            this.vibration(this.EXTRA_VIBRATION, () => {
                  if (callback) {callback();}
            });
      }
}
