import { TestBed, inject } from '@angular/core/testing';

import { ChoosyConfigService } from './choosy-config.service';

describe('ChoosyConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoosyConfigService]
    });
  });

  it('should be created', inject([ChoosyConfigService], (service: ChoosyConfigService) => {
    expect(service).toBeTruthy();
  }));
});
