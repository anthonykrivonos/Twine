import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationComponent } from './notification';

@NgModule({
  declarations: [
    NotificationComponent,
  ],
  imports: [
    IonicPageModule.forChild(NotificationComponent),
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationComponentModule {}
