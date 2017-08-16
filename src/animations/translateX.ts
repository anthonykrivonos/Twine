import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function translateX(duration:number, start:string, end:string) {
    return trigger('toggleXState', [
          state('true', style({
            transform: 'translateX(' + end + ')'
          })),
          state('false', style({
            transform: 'translateX(' + start + ')'
          })),
          transition('true => false', animate(duration + 'ms ease-in')),
          transition('false => true', animate(duration + 'ms ease-out'))
    ]);
}
