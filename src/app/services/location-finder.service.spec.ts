import { TestBed } from '@angular/core/testing';

import { LocationFinderService } from './location-finder.service';

describe('LocationFinderService', () => {
  let service: LocationFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
