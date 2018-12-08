import { animate, query, state, style, transition, trigger } from '@angular/animations';

export const animations = {
  show: trigger('showMenu', [
    state('void', style({
      opacity: 0,
      transform: 'scale(0.8)'
    })),
    transition('void => enter', [
      animate('120ms cubic-bezier(0, 0, 0.2, 1)',
        style({
          transform: 'scale(1)',
          opacity: 1
        })),
    ]),
    transition('* => void',
      animate('100ms 25ms linear',
        style({
          opacity: 0
        })
      )
    )
  ])
};
