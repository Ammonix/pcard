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
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss'],
})
export class RubricItemComponent implements OnInit, OnDestroy {
  @ViewChild('imgContainer') imgContainer!: ElementRef;
  @ViewChild('img') img!: ElementRef;

  @Input() rubric!: Rubric;

  imgUri = environment.serverBaseUri + '/files/';
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
            this.placeCircle(event.clientX, event.clientY, this.createCircle());
            return this.rubricService.addSubRubric$(
              this.rubric.id,
              result.formData
            );
          }
          return of(this.rubric);
        })
      )
      .subscribe((rubric) => (this.rubric = rubric));
  }

  private placeCircle(
    pointerX: number,
    pointerY: number,
    circle: HTMLDivElement
  ) {
    let x =
      pointerX - this.img.nativeElement.offsetLeft - circle.clientWidth / 2;
    let y = pointerY - this.img.nativeElement.offsetTop - circle.clientHeight;
    this.renderer.setStyle(circle, 'left', x + 'px');
    this.renderer.setStyle(circle, 'top', y + 'px');
  }

  private createCircle() {
    let circle: HTMLDivElement = this.renderer.createElement('div');
    let txt = this.renderer.createText('1');
    this.renderer.appendChild(circle, txt);
    this.renderer.addClass(circle, 'circle');
    this.renderer.appendChild(this.imgContainer.nativeElement, circle);
    return circle;
  }
}
