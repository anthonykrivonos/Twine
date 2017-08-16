import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuComponent } from './menu';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    IonicPageModule.forChild(MenuComponent),
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuComponentModule {}
