import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeExamples } from './pipe-examples';

describe('PipeExamples', () => {
  let component: PipeExamples;
  let fixture: ComponentFixture<PipeExamples>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeExamples]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeExamples);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
