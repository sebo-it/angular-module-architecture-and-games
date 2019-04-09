import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';

describe('TicTacToeRoutingModule', () => {
  let ticTacToeRoutingModule: TicTacToeRoutingModule;

  beforeEach(() => {
    ticTacToeRoutingModule = new TicTacToeRoutingModule();
  });

  it('should create an instance', () => {
    expect(ticTacToeRoutingModule).toBeTruthy();
  });
});
