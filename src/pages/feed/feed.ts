import {
      Component,
      ViewChild,
      OnInit,
      trigger,
      state,
      style,
      transition,
      animate,
      keyframes
} from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Content } from 'ionic-angular';

@Component({
      selector: 'page-feed',
      templateUrl: 'feed.html',
      animations: [

      ]
})
export class FeedPage {
      @ViewChild(Content) content: Content;
      state: string = 'inactive';

      constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {}

      ionViewDidLoad() {
            console.log('ionViewDidLoad FeedPage');
      }

      toggleMove() {
            this.state = (this.state === 'inactive' ? 'active' : 'inactive');
      }

      scroll(id) {
            this.content.scrollTo(0, document.getElementById('1').offsetTop, 300);
      }
}
