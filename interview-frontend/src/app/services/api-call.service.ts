import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { City } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  public hostUrl = 'http://localhost:3000/cities/';

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
    return throwError(() => error.error.message);
  }
}
