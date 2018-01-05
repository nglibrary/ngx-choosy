import { TestBed, inject } from '@angular/core/testing';

import { ChoosyListService } from './choosy-list.service';

describe('ChoosyListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoosyListService]
    });
  });

  it('should be created', inject([ChoosyListService], (service: ChoosyListService) => {
    expect(service).toBeTruthy();
  }));
});
