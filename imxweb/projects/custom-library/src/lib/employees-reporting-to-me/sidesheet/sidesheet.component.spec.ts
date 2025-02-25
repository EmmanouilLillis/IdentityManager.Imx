import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesheetComponent } from './sidesheet.component';

describe('SidesheetComponent', () => {
  let component: SidesheetComponent;
  let fixture: ComponentFixture<SidesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
