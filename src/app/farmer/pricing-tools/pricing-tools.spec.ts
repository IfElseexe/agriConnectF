import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTools } from './pricing-tools';

describe('PricingTools', () => {
  let component: PricingTools;
  let fixture: ComponentFixture<PricingTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
