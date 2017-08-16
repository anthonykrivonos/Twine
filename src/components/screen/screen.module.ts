import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenComponent } from './screen';

@NgModule({
  declarations: [
    ScreenComponent,
  ],
  imports: [
    IonicPageModule.forChild(ScreenComponent),
  ],
  exports: [
    ScreenComponent
  ]
})
export class ScreenComponentModule {}
