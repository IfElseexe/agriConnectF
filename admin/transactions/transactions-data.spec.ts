import { TestBed } from '@angular/core/testing';

import { TransactionsData } from './transactions-data';

describe('TransactionsData', () => {
  let service: TransactionsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
