import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagecardComponent } from './messagecard';

@NgModule({
  declarations: [
    MessagecardComponent,
  ],
  imports: [
    IonicPageModule.forChild(MessagecardComponent),
  ],
  exports: [
    MessagecardComponent
  ]
})
export class MessagecardComponentModule {}
