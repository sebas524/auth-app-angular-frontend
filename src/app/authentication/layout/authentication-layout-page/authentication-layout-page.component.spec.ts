import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLayoutPageComponent } from './authentication-layout-page.component';

describe('AuthenticationLayoutPageComponent', () => {
  let component: AuthenticationLayoutPageComponent;
  let fixture: ComponentFixture<AuthenticationLayoutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationLayoutPageComponent]
    });
    fixture = TestBed.createComponent(AuthenticationLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
