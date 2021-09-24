import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RubricService } from 'src/app/shared/services/rubric.service';
import { Rubric } from 'src/app/shared/types/rubric';
import { AddNewModalComponent } from '../add-new-modal/add-new-modal.component';

@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss'],
})
export class RubricItemComponent implements OnInit, OnDestroy {
  @ViewChild('imgContainer') imgContainer!: ElementRef;
  @ViewChild('img') img!: ElementRef;

  @Input() rubric!: Rubric;

  subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private simpleModalService: SimpleModalService,
    private rubricService: RubricService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  onImgClick(event: MouseEvent) {
    this.subscription = this.simpleModalService
      .addModal(AddNewModalComponent, {
        parentRubricName: this.rubric.name,
      })
      .pipe(
        mergeMap((result) => {
          if (result?.isValid) {
            this.placeButton(event.clientX, event.clientY, this.createButton());
            return this.rubricService.addSubRubric$(this.rubric.id, {
              name: result.formData.rubricName,
            });
          }
          return of(this.rubric);
        })
      )
      .subscribe((rubric) => (this.rubric = rubric));
  }

  private placeButton(
    pointerX: number,
    pointerY: number,
    btn: HTMLButtonElement
  ) {
    let x = pointerX - this.img.nativeElement.offsetLeft - btn.clientWidth / 2;
    let y = pointerY - this.img.nativeElement.offsetTop - btn.clientHeight;
    this.renderer.setStyle(btn, 'left', x + 'px');
    this.renderer.setStyle(btn, 'top', y + 'px');
  }

  private createButton() {
    let btn: HTMLButtonElement = this.renderer.createElement('BUTTON');
    let txt = this.renderer.createText('1');
    this.renderer.appendChild(btn, txt);
    this.renderer.appendChild(this.imgContainer.nativeElement, btn);
    return btn;
  }
}
