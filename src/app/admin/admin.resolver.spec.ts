import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminResolver } from './admin.resolver';

describe('AdminResolver', () => {
  let resolver: AdminResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(AdminResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
