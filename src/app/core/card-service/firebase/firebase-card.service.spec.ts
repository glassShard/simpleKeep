import { TestBed, inject } from '@angular/core/testing';

import { FirebaseCardService } from './firebase-card.service';

describe('FirebaseCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseCardService]
    });
  });

  it('should be created', inject([FirebaseCardService], (service: FirebaseCardService) => {
    expect(service).toBeTruthy();
  }));
});
