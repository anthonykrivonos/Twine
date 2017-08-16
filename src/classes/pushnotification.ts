import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class PushNotification {
      DEV_PROFILE = "twinedev";
      PROD_PROFILE = "twineprod";
      API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NzU2OGUzOC02OGIxLTQ5YzktYTQ4MS04ODY1MzI3YTc3NjgifQ.7jZL2GpHoxQB_BTy3n3JuBxRPjCldt4WoAu5qOVcn78";

      profile = this.DEV_PROFILE;

      constructor() {}

      sendNotification(title:string, body:string, tokens:any):void {
            var data = new Object();
            var notification = new Object();
            data["tokens"] = tokens;
            data["profile"] = this.profile;
            notification["title"] = title != null ? title : "Twine";
            if (body != null) { notification["message"] = body; }
            if (title != null || body != null) { data["notification"] = notification; }

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log("Sent notification: " + this.responseText);
			}
		});

		xhr.open("POST", "https://api.ionic.io/push/notifications");
		xhr.setRequestHeader("content-type", "application/json");
		xhr.setRequestHeader("authorization", "Bearer " + this.API_KEY);
		xhr.setRequestHeader("cache-control", "no-cache");

		xhr.send(JSON.stringify(data));
	}
}
