import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwinesPage } from './twines';

@NgModule({
  declarations: [
    TwinesPage,
  ],
  imports: [
    IonicPageModule.forChild(TwinesPage),
  ],
  exports: [
    TwinesPage
  ]
})
export class TwinesPageModule {}
