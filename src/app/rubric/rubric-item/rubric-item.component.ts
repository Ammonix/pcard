import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Observable, Subscription } from 'rxjs';
import { AddNewModalComponent } from '../add-new-modal/add-new-modal.component';

@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss'],
})
export class RubricItemComponent implements OnInit, OnDestroy {
  @ViewChild('imgContainer') imgContainer!: ElementRef;
  @ViewChild('img') img!: ElementRef;

  imgSrc = 'assets/imgs/motorboot.jpg';
  title = 'WASSERFAHRZEUGE';
  subTitle = 'Motorboote';
  subRubrics = [
    { name: 'Motorenraum Schallschutz' },
    { name: 'Innenraum Lärmschutz' },
    { name: 'Schaumstoff Polster Matratzen' },
    { name: 'Motorboot Dichtungen-Profile aus Gummi' },
  ];
  subscription!: Subscription;
  constructor(
    private renderer: Renderer2,
    private simpleModalService: SimpleModalService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  onImgClick(event: MouseEvent) {
    this.subscription = this.simpleModalService
      .addModal(AddNewModalComponent, {
        parentRubricName: this.title,
        message: 'Confirm message',
      })
      .subscribe((isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          this.placeButton(event.clientX, event.clientY, this.createButton());
        }
      });
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
