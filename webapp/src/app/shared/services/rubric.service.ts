import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Rubric } from '../types/rubric';

@Injectable({
  providedIn: 'root',
})
export class RubricService {
  getRubrics$(): Observable<Rubric[]> {
    return this.httpClient
      .get<{ statusCode: number; data: Rubric[] }>(
        'http://localhost:8888/rubrics'
      )
      .pipe(map((i) => i.data));
  }

  addSubRubric$(
    parentRubricId: string,
    rubric: Partial<Rubric>
  ): Observable<Rubric> {
    return this.httpClient
      .post<{ statusCode: number; data: Rubric }>(
        `http://localhost:8888/rubrics/${parentRubricId}/children`,
        rubric
      )
      .pipe(
        map((i) => i.data),
        catchError((_) => throwError(`Parent id: ${parentRubricId} not found`))
      );
  }

  constructor(private httpClient: HttpClient) {}
}
