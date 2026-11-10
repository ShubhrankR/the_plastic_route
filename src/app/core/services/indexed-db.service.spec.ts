import { TestBed } from '@angular/core/testing';
import { IndexedDBService } from './indexed-db.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IndexedDBService', () => {
  let service: IndexedDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexedDBService],
    });
    service = TestBed.inject(IndexedDBService);
  });

  it('should create the IndexedDBService instance', () => {
    expect(service).toBeDefined();
    expect(service.isInitialized).toBeDefined();
  });
});
