import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationcardComponent } from './invitationcard';

@NgModule({
  declarations: [
    InvitationcardComponent,
  ],
  imports: [
    IonicPageModule.forChild(InvitationcardComponent),
  ],
  exports: [
    InvitationcardComponent
  ]
})
export class InvitationcardComponentModule {}
