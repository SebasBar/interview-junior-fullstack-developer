import { ApiCallService } from './../../services/api-call.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MockApiCallService,
  allCitiesMock,
  berlinMock,
} from '../../mocks/cities-mock';
import { TableComponent } from './table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
describe('FormComponent', () => {
  let formComponent: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, TableComponent],
      providers: [{ provide: ApiCallService, useClass: MockApiCallService }],
      imports: [ReactiveFormsModule, NgxPaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    formComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(formComponent).toBeTruthy();
  });

  describe('onSubmit', () => {
    describe('searchValueControl = ""', () => {
      it('get allCitiesMock with searchValueTypeControl = "byName"', () => {
        formComponent.onSubmit();
        expect(
          formComponent.citiesForm.get('searchValueTypeControl')?.value
        ).toBe('byName');
        expect(formComponent.citiesResponse).toEqual(allCitiesMock);
      });

      it('get allCitiesMock with searchValueTypeControl = "byUuid"', () => {
        formComponent.citiesForm.patchValue({
          searchValueTypeControl: 'byUuid',
        });
        formComponent.onSubmit();
        expect(
          formComponent.citiesForm.get('searchValueTypeControl')?.value
        ).toBe('byUuid');
        expect(formComponent.citiesResponse).toEqual(allCitiesMock);
      });

      it('get allCitiesMock searchValueTypeControl = "byCount"', () => {
        formComponent.citiesForm.patchValue({
          searchValueTypeControl: 'byCount',
        });
        formComponent.onSubmit();
        expect(
          formComponent.citiesForm.get('searchValueTypeControl')?.value
        ).toBe('byCount');
        expect(formComponent.citiesResponse).toEqual(allCitiesMock);
      });
    });

    describe('searchValueControl = "berlin"', () => {
      it('returns berlinMock with seearchValueControlType = "byName"', () => {
        formComponent.citiesForm.patchValue({
          searchValueControl: berlinMock.cityName,
        });
        formComponent.onSubmit();
        expect(
          formComponent.citiesForm.get('searchValueTypeControl')?.value
        ).toBe('byName');
        expect(formComponent.citiesResponse).toEqual([berlinMock]);
      });
    });

    describe('searchValueControl = "berlinMock.uuid"', () => {
      it('returns berlinMock with seearchValueControlType = "byUuid"', () => {
        formComponent.citiesForm.setValue({
          searchValueControl: berlinMock.uuid,
          searchValueTypeControl: 'byUuid',
        });
        formComponent.onSubmit();
        expect(formComponent.citiesForm.get('searchValueControl')?.value).toBe(
          berlinMock.uuid
        );
        expect(
          formComponent.citiesForm.get('searchValueTypeControl')?.value
        ).toBe('byUuid');
        expect(formComponent.citiesResponse).toEqual([berlinMock]);
      });
    });

    describe('searchValueControl = "berlinMock.count"', () => {
      it('returns berlinMock with seearchValueControlType = "byCount"', () => {
        formComponent.citiesForm.setValue({
          searchValueControl: String(berlinMock.count),
          searchValueTypeControl: 'byCount',
        });
        formComponent.onSubmit();
        expect(
          formComponent.citiesForm.get('searchValueTypeControl')?.value
        ).toBe('byCount');
        expect(formComponent.citiesResponse).toEqual([berlinMock]);
      });
    });
  });
});
