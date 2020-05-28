import { TestBed, inject } from '@angular/core/testing';
import { Api } from './api';
import { HttpClientModule } from '@angular/common/http';

import { DocumentService } from './document.service';

describe('DocumentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocumentService,
        Api
      ],
      declarations: [],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([DocumentService], (service: DocumentService) => {
    expect(service).toBeTruthy();
  }));
});
