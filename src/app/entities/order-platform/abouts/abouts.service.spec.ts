import { TestBed } from '@angular/core/testing';

import { AboutsService } from './abouts.service';

describe('AboutsService', () => {
  let service: AboutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
