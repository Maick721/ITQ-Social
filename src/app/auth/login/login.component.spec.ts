import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { signal } from '@angular/core';

// Mock del AuthService
const mockAuthService = {
  isLoading: signal(false),
  error: signal(null),
  currentUser: signal(null),
  loginWithEmail: jasmine.createSpy('loginWithEmail'),
  loginWithMicrosoft: jasmine.createSpy('loginWithMicrosoft'),
  logout: jasmine.createSpy('logout')
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});