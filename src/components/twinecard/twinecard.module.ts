import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwinecardComponent } from './twinecard';

@NgModule({
  declarations: [
    TwinecardComponent,
  ],
  imports: [
    IonicPageModule.forChild(TwinecardComponent),
  ],
  exports: [
    TwinecardComponent
  ]
})
export class TwinecardComponentModule {}
