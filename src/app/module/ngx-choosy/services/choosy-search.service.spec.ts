import { TestBed, inject } from '@angular/core/testing';

import { ChoosySearchService } from './choosy-search.service';

describe('ChoosySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoosySearchService]
    });
  });

  it('should be created', inject([ChoosySearchService], (service: ChoosySearchService) => {
    expect(service).toBeTruthy();
  }));
});
