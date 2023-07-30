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

  citiesForm = new FormGroup({
    searchValueControl: new FormControl('', Validators.required),
    searchValueTypeControl: new FormControl('', Validators.required),
  });

  cities: City[] = emptyCity;

  ngOnInit() {
    this.apiCallService.getCities().subscribe(
      (cities) => {
        this.cities = cities;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.citiesForm.value);

    const searchValue = this.citiesForm.get('searchValueControl')?.value;
    const searchValueType = this.citiesForm.get(
      'searchValueTypeControl'
    )?.value;
    const url = `${searchValueType}/${searchValue}`;

    this.apiCallService.getCitiesBy(url).subscribe(
      (cities) => {
        console.log(cities);
        this.cities = cities;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onChangeSearchParameter(event: Event) {
    this.citiesForm.patchValue({
      searchValueTypeControl: (event.target as HTMLInputElement).value,
    });
    console.log('event', this.citiesForm.get('searchValueTypeControl')?.value);
  }

  onTextInputChange(event: Event) {
    this.citiesForm.patchValue({
      searchValueControl: (event.target as HTMLInputElement).value,
    });
  }
}
