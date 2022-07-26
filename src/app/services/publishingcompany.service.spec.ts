/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublishingcompanyService } from './publishingcompany.service';

describe('Service: Publishingcompany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublishingcompanyService]
    });
  });

  it('should ...', inject([PublishingcompanyService], (service: PublishingcompanyService) => {
    expect(service).toBeTruthy();
  }));
});
