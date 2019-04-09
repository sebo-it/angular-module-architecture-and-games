import { TicTacToeModule } from './tic-tac-toe.module';

describe('TicTacToeModule', () => {
  let ticTacToeModule: TicTacToeModule;

  beforeEach(() => {
    ticTacToeModule = new TicTacToeModule();
  });

  it('should create an instance', () => {
    expect(ticTacToeModule).toBeTruthy();
  });
});
