import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastStepComponent } from './last-step.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LastStepComponent', () => {
  let component: LastStepComponent;
  let fixture: ComponentFixture<LastStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastStepComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
