import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableComponent } from './table.component';
import { allCitiesMock, berlinMock } from 'src/app/mocks/cities-mock';
import { emptyCity } from 'src/app/types/constants';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let tableComponent: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [NgxPaginationModule],
    });
    fixture = TestBed.createComponent(TableComponent);
    tableComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(tableComponent).toBeTruthy();
  });

  describe('with cities @Input', () => {
    describe('< 5 cities', () => {
      it('displays table and not paginator', () => {
        const table = fixture.debugElement.query(
          By.css('.table-container')
        ).nativeElement;
        fixture.detectChanges();
        expect(table).toBeDefined();
        expect(fixture.debugElement.query(By.css('.paginator'))).toBeNull();
      });
    });

    describe('> 5 cities', () => {
      it('displays table and paginator', () => {
        tableComponent.cities = allCitiesMock;
        const table = fixture.debugElement.query(
          By.css('.table-container')
        ).nativeElement;
        fixture.detectChanges();
        expect(table).toBeDefined();
        const paginator = fixture.debugElement.query(
          By.css('.paginator')
        ).nativeElement;
        expect(paginator).toBeDefined();
      });
    });
  });
});
