import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricItemComponent } from './rubric-item.component';

describe('RubricItemComponent', () => {
  let component: RubricItemComponent;
  let fixture: ComponentFixture<RubricItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
