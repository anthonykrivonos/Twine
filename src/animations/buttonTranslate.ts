import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function buttonTranslate(duration:number, start:string, middle:string, end:string) {
    return trigger('toggleButtonYState', [
          state('end', style({
            transform: 'translateY(' + end + ')'
          })),
          state('middle', style({
            transform: 'translateY(' + middle + ')'
          })),
          state('start', style({
            transform: 'translateY(' + start + ')'
          })),
          transition('start => middle', animate(duration + 'ms ease-in')),
          transition('middle => end', animate(duration + 'ms ease-in')),
          transition('middle => start', animate(duration + 'ms ease-in')),
          transition('end => start', animate(duration + 'ms ease-in')),
          transition('end => middle', animate(duration + 'ms ease-in')),
          transition('start => end', animate(duration + 'ms ease-in'))
    ]);
}
