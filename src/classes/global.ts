import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Observable } from 'rxJS';

@Injectable()
export class Global {
      constructor(public events:Events) {}

      event(name:string, callback:any = null) {
            callback ? this.events.subscribe(name, () => callback()) : this.events.publish(name);
      }

      analytics(callback:any = null):void {this.event('analytics:enable', callback);}

      config(callback:any = null):void {this.event('config:load', callback);}

      button(option:string, callback:any = null):void {this.event(`button:${option}`, callback);}

      comments(option:string, callback:any = null):void {this.event(`comments:${option}`, callback);}

      messages(option:string, callback:any = null):void {this.event(`messages:${option}`, callback);}

      menu(option:string, callback:any = null):void {this.event(`menu:${option}`, callback);}

      login(option:string, callback:any = null):void {this.event(`login:${option}`, callback);}

      twine(option:string, callback:any = null):void {this.event(`twine:${option}`, callback);}

      twines(option:string, callback:any = null):void {this.event(`twine:${option}`, callback);}

      screen(option:string, callback:any = null):void {this.event(`screen:${option}`, callback);}
}
