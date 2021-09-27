import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Rubric } from '../types/rubric';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RubricService {
  getRubrics$(): Observable<Rubric[]> {
    return this.httpClient
      .get<{ statusCode: number; data: Rubric[] }>(
        `${environment.serverBaseUri}/rubrics`
      )
      .pipe(map((i) => i.data));
  }

  getRubricById$(id: string): Observable<Rubric> {
    return this.httpClient
      .get<{ statusCode: number; data: Rubric }>(
        `${environment.serverBaseUri}/rubrics/${id}`
      )
      .pipe(map((i) => i.data));
  }

  addSubRubric$(
    parentRubricId: string,
    formData: FormData
  ): Observable<Rubric> {
    return this.httpClient
      .post<{ statusCode: number; data: Rubric }>(
        `${environment.serverBaseUri}/rubrics/${parentRubricId}/children`,
        formData
      )
      .pipe(
        map((i) => i.data),
        catchError((_) => throwError(`Parent id: ${parentRubricId} not found`))
      );
  }

  constructor(private httpClient: HttpClient) {}
}
