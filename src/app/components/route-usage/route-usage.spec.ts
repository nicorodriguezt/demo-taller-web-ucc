import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteUsage } from './route-usage';

describe('RouteUsage', () => {
  let component: RouteUsage;
  let fixture: ComponentFixture<RouteUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteUsage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteUsage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
