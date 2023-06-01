import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoCadastralComponent } from './resumo-cadastral.component';

describe('ResumoCadastralComponent', () => {
  let component: ResumoCadastralComponent;
  let fixture: ComponentFixture<ResumoCadastralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumoCadastralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoCadastralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
