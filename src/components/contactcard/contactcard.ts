import { Component, Input } from '@angular/core';

import { Contacts } from '../../classes/contacts';

@Component({
  selector: 'twine-contactcard',
  templateUrl: 'contactcard.html',
  providers: [Contacts]
})
export class ContactcardComponent {
      @Input() contact:any;

      nameStr:string;
      blockedBool:boolean;

      constructor(public contacts:Contacts){}

      invite():void {
            this.contacts.sendInvite(this.contact);
      }
}
