import { TestBed, inject } from '@angular/core/testing';

import { HttpCardService } from './http-card.service';

describe('HttpCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCardService]
    });
  });

  it('should be created', inject([HttpCardService], (service: HttpCardService) => {
    expect(service).toBeTruthy();
  }));
});
