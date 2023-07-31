import { HttpErrorResponse } from '@angular/common/http';
import { ApiCallService } from './../../services/api-call.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyCity } from 'src/app/types/constants';
import { City } from 'src/app/types/types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private apiCallService: ApiCallService) {}

  searchValue = '';
  searchValueType = '';
  searchPlaceholder = 'Please select a type for the search';
  isResponse = false;
  warningMessage = '';
  errorMessage = '';

  citiesForm = new FormGroup({
    searchValueControl: new FormControl('', Validators.required),
    searchValueTypeControl: new FormControl('', Validators.required),
  });

  cities: City[] = emptyCity;

  ngOnInit() {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.citiesForm.value);
    const searchValue = this.citiesForm.get('searchValueControl')?.value;
    const searchValueType = this.citiesForm.get(
      'searchValueTypeControl'
    )?.value;
    const url = `${searchValueType}/${searchValue}`;

    if (searchValue === '' || searchValueType === '') {
      this.apiCallService.getCities().subscribe(
        (cities) => {
          this.warningMessage =
            'We are displaying all the results, you need to enter a text and select a search type';
          this.responseHandle(cities);
        },
        (errMsg) => {
          this.errorHandle(errMsg);
        }
      );
    } else {
      this.apiCallService.getCitiesBy(url).subscribe(
        (cities) => {
          console.log(cities);
          this.responseHandle(cities);
        },
        (errMsg) => {
          this.errorHandle(errMsg);
        }
      );
    }
  }

  onChangeSearchType(event: Event) {
    this.citiesForm.patchValue({
      searchValueTypeControl: (event.target as HTMLInputElement).value,
    });
    this.searchValueType = (event.target as HTMLInputElement).value;
    this.searchPlaceholder = `Type to search for a german city ${this.searchValueType}`;
  }

  onTextInputChange(event: Event) {
    this.citiesForm.patchValue({
      searchValueControl: (event.target as HTMLInputElement).value,
    });
  }

  errorHandle(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.isResponse = false;
    throw errorMessage;
  }

  responseHandle(cities: City[]) {
    this.cities = cities;
    this.isResponse = true;
    this.errorMessage = '';
  }
}
