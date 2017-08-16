import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedComponent } from './feed';

@NgModule({
  declarations: [
    FeedComponent,
  ],
  imports: [
    IonicPageModule.forChild(FeedComponent),
  ],
  exports: [
    FeedComponent
  ]
})
export class FeedComponentModule {}
