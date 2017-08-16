import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactcardComponent } from './contactcard';

@NgModule({
  declarations: [
    ContactcardComponent,
  ],
  imports: [
    IonicPageModule.forChild(ContactcardComponent),
  ],
  exports: [
    ContactcardComponent
  ]
})
export class ContactcardComponentModule {}
