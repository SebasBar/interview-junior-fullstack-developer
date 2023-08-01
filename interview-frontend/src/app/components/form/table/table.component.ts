import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { emptyCity } from 'src/app/types/constants';
import { City } from 'src/app/types/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() cities: City[] = emptyCity;
  page = 1;
  count = 5;

  ngOnChanges(changes: SimpleChanges) {
    this.resetToPageOne(changes['cities'].currentValue);
  }

  // To reset to page 1 on new search
  resetToPageOne(cities: City[]) {
    if (cities) this.page = 1;
  }
}
