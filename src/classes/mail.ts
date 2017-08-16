import { Component, Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { User } from '../classes/user';

@Injectable()
@Component({
  providers: [User]
})
export class Mail {
      constructor(public nativeStorage:NativeStorage, public db:AngularFireDatabase, public user:User) {}

      sendMail(type:string, text:string):void {
            this.user.getUser((user) => {
                  var data = new Object();
                  data["name"] = user.name
                  data["email"] = user.email;
                  data["picture"] = user.picture;
                  data["text"] = text;

                  this.db.object('/general/twinemail').take(1).subscribe((twinemail) => {
                        var xhr = new XMLHttpRequest();
                        var endpoint = twinemail.address + twinemail.endpoints[type];

                        xhr.addEventListener("readystatechange", function () {
            			if (this.readyState === 4) {
            				console.log("Got response: " + this.responseText);
            			}
            		});

                        xhr.open("POST", endpoint);
                        xhr.setRequestHeader("Accept", "application/json");
                  	xhr.setRequestHeader("Content-Type", "application/json");
                        console.log("Twinemail sending: " + JSON.stringify(data, undefined, 2));
                        console.log("Twinemail endpoint: " + endpoint);

            		xhr.send(JSON.stringify(data));
                  })
            })
	}
}
