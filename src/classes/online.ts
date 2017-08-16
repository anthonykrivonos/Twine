import { Injectable } from '@angular/core';

import { Network } from '@ionic-native/network';

import { Observable } from 'rxJS';

@Injectable()
export class Online {
      constructor(private network: Network) {}

      connected(callback:any = null):void {
            callback ? this.network.onConnect().subscribe(()=>callback()) : null;
      }

      disconnected(callback:any = null):void {
            callback ? this.network.onDisconnect().subscribe(()=>callback()) : null;
      }

      changed(callback:any = null):void {
            callback ? this.network.onchange().subscribe(()=>callback()) : null;
      }

      unsubConnection(connection:any):void {
            connection.unsubscribe();
      }
}
