import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestPlanning } from './harvest-planning';

describe('HarvestPlanning', () => {
  let component: HarvestPlanning;
  let fixture: ComponentFixture<HarvestPlanning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestPlanning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestPlanning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
