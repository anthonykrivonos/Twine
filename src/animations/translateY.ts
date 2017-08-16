import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function translateY(duration:number, start:string, end:string) {
    return trigger('toggleYState', [
          state('true', style({
            transform: 'translateY(' + end + ')'
          })),
          state('false', style({
            transform: 'translateY(' + start + ')'
          })),
          transition('true => false', animate(duration + 'ms ease-in')),
          transition('false => true', animate(duration + 'ms ease-out'))
    ]);
}
