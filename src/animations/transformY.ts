import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function transformY(duration:number) {
    return trigger('toggleState', [
          state('true', style({height: '315pt'})),
          state('false',   style({height: '105pt'})),
          transition('true => false', animate(duration + 'ms ease-in')),
          transition('false => true', animate(duration + 'ms ease-out'))
    ]);
}
