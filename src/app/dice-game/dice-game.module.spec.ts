import { DiceGameModule } from './dice-game.module';

describe('DiceGameModule', () => {
  let diceGameModule: DiceGameModule;

  beforeEach(() => {
    diceGameModule = new DiceGameModule();
  });

  it('should create an instance', () => {
    expect(diceGameModule).toBeTruthy();
  });
});
