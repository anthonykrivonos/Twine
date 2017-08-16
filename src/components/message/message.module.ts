import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageComponent } from './message';

@NgModule({
  declarations: [
    MessageComponent,
  ],
  imports: [
    IonicPageModule.forChild(MessageComponent),
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageComponentModule {}
