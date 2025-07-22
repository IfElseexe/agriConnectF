import { ComponentFixture, TestBed } from '@angular/core/testing';

      import { FarmerSidebar } from './sidebar';

describe('Sidebar', () => {
  let component: FarmerSidebar;
  let fixture: ComponentFixture<FarmerSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
