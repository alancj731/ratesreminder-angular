import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninbuttonComponent } from './signinbutton.component';

describe('SigninbuttonComponent', () => {
  let component: SigninbuttonComponent;
  let fixture: ComponentFixture<SigninbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninbuttonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
