import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ButtonComponent } from './button';

@NgModule({
  declarations: [
    ButtonComponent,
  ],
  imports: [
    IonicPageModule.forChild(ButtonComponent),
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonComponentModule {}
