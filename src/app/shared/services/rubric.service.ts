import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Rubric } from '../types/rubric';

@Injectable({
  providedIn: 'root',
})
export class RubricService {
  mockDB: Rubric[] = [
    {
      id: '6d1295d4-d414-4aab-8d38-d167491f716c',
      name: 'Wasserfahrzeuge',
      subTitle: 'Motorboote',
      imgSrc: 'assets/imgs/motorboot.jpg',
      children: [
        {
          id: 'd7f23367-670f-4054-bc49-fbfdcf886717',
          name: 'Motorenraum Schallschutz',
          imgSrc: 'assets/imgs/motorboot.jpg',
        },
        {
          id: 'b537fd5f-7868-4f99-af33-d51e2ce2e948',
          name: 'Innenraum Lärmschutz',
          imgSrc: 'assets/imgs/motorboot.jpg',
        },
        {
          id: '3a6ffd43-6c6a-4e89-837d-b7095d321fd2',
          name: 'Schaumstoff Polster Matratzen',
          imgSrc: 'assets/imgs/motorboot.jpg',
        },
        {
          id: 'aa80de7c-198e-4597-93a0-c06e14d381dd',
          name: 'Motorboot Dichtungen-Profile aus Gummi',
          imgSrc: 'assets/imgs/motorboot.jpg',
        },
      ],
    },
  ];

  getRubrics$(): Observable<Rubric[]> {
    return of(this.mockDB);
  }
  addSubRubric$(
    parentRubricId: string,
    rubric: Partial<Rubric>
  ): Observable<Rubric> {
    const parentRubric = this.mockDB.find((i) => i.id == parentRubricId);
    if (parentRubric) {
      parentRubric?.children?.push({
        id: '',
        name: rubric.name ?? '',
        imgSrc: 'assets/imgs/motorboot.jpg',
      });
      return of(parentRubric);
    }
    return throwError(`Parent id: ${parentRubricId} not found`);
  }

  constructor() {}
}
