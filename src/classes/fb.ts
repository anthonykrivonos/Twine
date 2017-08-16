import { Component, Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
@Component({
  providers: [InAppBrowser]
})
export class FB {
      FACEBOOK_URL = "https://www.facebook.com/";

      constructor(private iab: InAppBrowser) {}

      generateFacebookURLFromID(id:any):string {
            return this.FACEBOOK_URL + id + "/";
      }

      openFacebookProfile(id:any):void {
            const fbBrowser = this.iab.create(this.generateFacebookURLFromID(id));
      }
}
