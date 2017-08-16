import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedcardComponent } from './feedcard';

@NgModule({
  declarations: [
    FeedcardComponent,
  ],
  imports: [
    IonicPageModule.forChild(FeedcardComponent),
  ],
  exports: [
    FeedcardComponent
  ]
})
export class FeedcardComponentModule {}
