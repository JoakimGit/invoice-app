import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
    trigger('slideInOutAnimation', [
        state('*', style({
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        })),
        transition(':enter', [
            style({
                transform: 'translateX(-100px)',
                opacity: "0"
            }),
            animate('.5s ease-in-out', style({
                transform: 'translateX(0)',
                opacity: "1"
            }))
        ]),
        transition(':leave', [
            animate('0.5s ease-in-out', style({
                transform: 'translateX(-50px)',
                opacity: "0"
            }))
        ])
    ]);