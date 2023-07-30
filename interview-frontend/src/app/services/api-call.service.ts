import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { City } from '../types/types';
import { cityErrorResponse } from '../types/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  private hostUrl = 'http://localhost:3000/cities/';

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.hostUrl).pipe(
      tap((cities) => JSON.stringify(cities)),
      catchError(this.handleError)
    );
  }

  getCitiesBy(url: string): Observable<City[]> {
    return this.http.get<City[]>(this.hostUrl + url).pipe(
      tap((cities) => JSON.stringify(cities)),
      catchError(this.handleError)
    );
  }

  private handleError(error: ErrorEvent) {
    console.error(`Error massage: ${error.message}`);
    return of(cityErrorResponse);
  }
}
