import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log email and password on submit', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    spyOn(console, 'log');
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Email:', 'test@example.com');
    expect(console.log).toHaveBeenCalledWith('Password:', 'password');
  });
});
