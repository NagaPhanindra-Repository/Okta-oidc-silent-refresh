import { TestBed } from '@angular/core/testing';

import { NgIdleService } from './ng-idle.service';

describe('NgIdleService', () => {
  let service: NgIdleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgIdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
