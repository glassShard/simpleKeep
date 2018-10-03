import { CardServiceModule } from './card-service.module';

describe('CardServiceModule', () => {
  let cardServiceModule: CardServiceModule;

  beforeEach(() => {
    cardServiceModule = new CardServiceModule();
  });

  it('should create an instance', () => {
    expect(cardServiceModule).toBeTruthy();
  });
});
