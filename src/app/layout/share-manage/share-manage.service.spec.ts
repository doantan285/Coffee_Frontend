import { TestBed } from '@angular/core/testing';

import { ShareManageService } from './share-manage.service';

describe('ShareManageService', () => {
  let service: ShareManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
