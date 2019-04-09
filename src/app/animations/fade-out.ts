import { trigger, transition, animate, state, style} from '@angular/animations';

export let fadeOut =	trigger('fadeOut', [
  state('void', style({opacity: 0})),
  transition(':leave', [
    animate(1000)
  ])
]);
