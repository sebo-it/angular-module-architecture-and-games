import { trigger, transition, animate, state, style} from '@angular/animations';

export let fadeIn =	trigger('fadeIn', [
  state('void', style({opacity: 0})),
  transition(':enter', [
    animate(1000)
  ])
]);
