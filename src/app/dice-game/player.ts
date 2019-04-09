import { Result } from './result';

export class Player extends Result {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
