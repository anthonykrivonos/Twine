import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceholderComponent } from './placeholder';

@NgModule({
  declarations: [
    PlaceholderComponent,
  ],
  imports: [
    IonicPageModule.forChild(PlaceholderComponent),
  ],
  exports: [
    PlaceholderComponent
  ]
})
export class PlaceholderComponentModule {}
