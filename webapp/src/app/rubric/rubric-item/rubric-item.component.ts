import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { filter, mergeAll, mergeMap } from 'rxjs/operators';
import { RubricService } from 'src/app/shared/services/rubric.service';
import { Rubric } from 'src/app/shared/types/rubric';
import { AddNewModalComponent } from '../add-new-modal/add-new-modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss'],
})
export class RubricItemComponent implements OnInit {
  @Input() set mainRubricId(id: string) {
    this.rubricSubject$.next(this.rubricService.getRubricById$(id));
  }

  rubricSubject$ = new ReplaySubject<Observable<Rubric>>();
  rubric$ = this.rubricSubject$.pipe(
    mergeAll(),
    filter((i) => !!i)
  );
  baseUri = environment.serverBaseUri + '/files/';

  constructor(
    private simpleModalService: SimpleModalService,
    private rubricService: RubricService
  ) {}

  ngOnInit(): void {}

  openSubRubric(id: string) {
    this.rubricSubject$.next(this.rubricService.getRubricById$(id));
  }

  createDots(children?: Rubric[]) {
    return children?.map((i, index) => ({
      x: i.x ?? 0,
      y: i.y ?? 0,
      number: (index + 1).toString(),
    }));
  }

  onImageClick(event: MouseEvent, parentRubricName: string, parentId: string) {
    this.rubricSubject$.next(
      this.simpleModalService
        .addModal(AddNewModalComponent, {
          parentRubricName,
        })
        .pipe(
          mergeMap((result) => {
            if (result?.isValid) {
              result.formData.append('x', event.offsetX.toString());
              result.formData.append('y', event.offsetY.toString());
              return this.rubricService.addSubRubric$(
                parentId,
                result.formData
              );
            }
            return EMPTY;
          })
        )
    );
  }
}
