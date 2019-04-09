import { DiceGameRoutingModule } from './dice-game-routing.module';

describe('DiceGameRoutingModule', () => {
  let diceGameRoutingModule: DiceGameRoutingModule;

  beforeEach(() => {
    diceGameRoutingModule = new DiceGameRoutingModule();
  });

  it('should create an instance', () => {
    expect(diceGameRoutingModule).toBeTruthy();
  });
});
