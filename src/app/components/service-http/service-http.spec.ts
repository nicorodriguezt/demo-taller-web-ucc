import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHttp } from './service-http';

describe('ServiceHttp', () => {
  let component: ServiceHttp;
  let fixture: ComponentFixture<ServiceHttp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceHttp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceHttp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
