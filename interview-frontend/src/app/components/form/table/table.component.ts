import { Component, Input } from '@angular/core';
import { emptyCity } from 'src/app/types/constants';
import { City } from 'src/app/types/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() cities: City[] = emptyCity;
}
