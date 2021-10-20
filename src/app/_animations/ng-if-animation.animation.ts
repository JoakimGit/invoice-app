import { trigger, transition, animateChild, query } from '@angular/animations';

export const ngIfAnimation =
  trigger('ngIfAnimation', [
    transition(':enter, :leave', [
      query('@*', animateChild())
    ])
  ])