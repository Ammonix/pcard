import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-rubric-item',
  templateUrl: './rubric-item.component.html',
  styleUrls: ['./rubric-item.component.scss'],
})
export class RubricItemComponent implements OnInit {
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
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
  
  onImgClick(event: MouseEvent) {
    this.placeButton(event.clientX, event.clientY, this.createButton());
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
