import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockcardComponent } from './blockcard';

@NgModule({
  declarations: [
    BlockcardComponent,
  ],
  imports: [
    IonicPageModule.forChild(BlockcardComponent),
  ],
  exports: [
    BlockcardComponent
  ]
})
export class BlockcardComponentModule {}
