import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HidecardComponent } from './hidecard';

@NgModule({
  declarations: [
    HidecardComponent,
  ],
  imports: [
    IonicPageModule.forChild(HidecardComponent),
  ],
  exports: [
    HidecardComponent
  ]
})
export class HidecardComponentModule {}
