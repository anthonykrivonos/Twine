import { Injectable } from '@angular/core';

import { Contacts as ContactsClass, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { NativeStorage } from '@ionic-native/native-storage';
import { SMS } from '@ionic-native/sms';

@Injectable()
export class Contacts {

      LINK_URL = "www.twineme.com";

      constructor(private contacts:ContactsClass, public nativeStorage:NativeStorage, private sms:SMS) {}

      findContacts(callback:any):any {
            this.contacts.find(["*"]).then((contacts) => {
                  var tempContacts = [];
                  var phoneList = [];
                  for (var i = 0; i < contacts.length; i++) {
                        var contact = contacts[i];
                        var phone = this.extractValue(contact.phoneNumbers);
                        contact = this.createContact(contact.name.givenName, this.formatNumber(phone), this.extractValue(contact.photos));
<<<<<<< HEAD
                        if (contact && contact.name && contact.phone && phoneList.indexOf(contact.phone) == -1)
=======
                        if (contact && contact.name && contact.phone && !phoneList.includes(contact.phone))
>>>>>>> 1cefd4fb3e488e62fadc2165570575f2ef576b53
                        {
                              phoneList.push(contact.phone);
                              tempContacts.push(contact);
                        }
                  }
                  contacts = tempContacts.sort((a,b) => {
                        if (a.name < b.name) return -1;
                        else if (a.name > b.name) return 1;
                        else if (a.name == b.name) {
                              if (a.phone < b.phone) return -1;
                              else if (a.phone > b.phone) return -1;
                        }
                        else return 0;
                  });
                  console.log("Generated contacts list: " + JSON.stringify(contacts));
                  callback(contacts);
            }).catch();
      }

      extractValue(arr:any):string {
            return arr ? arr.filter((item) => item != null).map((item) => item.value)[0] : null;
      }

      storeContacts(success:any = null, failure:any = null):void {
            this.findContacts((contacts)=>{
                  this.nativeStorage.setItem('contacts', contacts).then((contact) => {
                        console.log("Set contacts list: " + JSON.stringify(contact));
                        if (success) {success(contact);}
                  }).catch((e) => {
                        console.log("Could not set contacts list: " + JSON.stringify(e));
                        if (failure) {failure(e);}
                  });
            });
      }

      getContacts(success:any = null, failure:any = null):void {
            this.nativeStorage.getItem('contacts').then((contacts) => {
                  if (success) {success(contacts);}
            }).catch((e) => {
                  if (failure) {failure(e);}
            });
      }

      unStoreContacts(success:any = null, failure:any = null):void {
            this.nativeStorage.remove('contacts').then((contacts) => {
                  if (success) {success(contacts);}
            }).catch((e) => {
                  if (failure) {failure(e);}
            });
      }

      createContact(name:string, phone:string, picture:string):any {
            return {
                  name,
                  phone,
                  picture
            };
      }

      formatNumber(number:string):string {
            if (number == null) return null;
            else if (number.indexOf('+1') == 0) number = number.substring(2);
            else if (number.indexOf('1') == 0) number = number.substring(1);
            var number2 = (""+number).replace(/\D/g, '');
            var m = number2.match(/^(\d{3})(\d{3})(\d{4})$/);
            return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
      }

      unFormatNumber(number:string):string {
            var number2 = (""+number).replace(/\D/g, '');
            var m = number2.match(/^(\d{3})(\d{3})(\d{4})$/);
            return (!m) ? null : m[1] + m[2] + m[3];
      }

      generateInviteString(name:string) {
            return `Hey, ${name}! I wanted you to check out an app called Twine, a new way to connect friends. Click here to download it:\n${this.LINK_URL}`;
      }

      sendInvite(contact:any):void {
            this.sms.send(this.unFormatNumber(contact.phone), this.generateInviteString(contact.name), {
                  replaceLineBreaks: true
            });
      }
}
