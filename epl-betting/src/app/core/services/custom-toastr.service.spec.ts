import { TestBed } from '@angular/core/testing';

import { CustomToastrService } from './custom-toastr.service';

describe('CustomToastrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomToastrService = TestBed.get(CustomToastrService);
    expect(service).toBeTruthy();
  });
});
