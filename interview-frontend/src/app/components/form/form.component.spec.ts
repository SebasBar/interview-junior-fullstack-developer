import { ApiCallService } from './../../services/api-call.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MockApiCallService } from '../../mocks/cities-mock';
describe('FormComponent', () => {
  let formComponent: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [{ provide: ApiCallService, useClass: MockApiCallService }],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(FormComponent);
    formComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(formComponent).toBeTruthy();
  });
});
