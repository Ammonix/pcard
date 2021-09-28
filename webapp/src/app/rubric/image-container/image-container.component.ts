import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss'],
})
export class ImageContainerComponent implements OnInit, OnChanges {
  @ViewChild('imgContainer') imgContainer!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  @Input() imageSource?: string;
  @Input() dots?: { x: number; y: number; number: string }[];
  @Output() onImageClick = new EventEmitter<MouseEvent>();

  circles?: HTMLDivElement[];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.imgContainer && this.img) {
     this.circles?.forEach(i=>this.renderer.removeChild(this.imgContainer.nativeElement, i))
      this.circles = this.dots?.map((i) => {
        let circle = this.createCircle(i.number);
        this.placeCircle(i.x, i.y, circle);
        return circle;
      });
    }
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

  private createCircle(number: string) {
    let circle: HTMLDivElement = this.renderer.createElement('div');
    let txt = this.renderer.createText(number);
    this.renderer.appendChild(circle, txt);
    this.renderer.addClass(circle, 'circle');
    this.renderer.appendChild(this.imgContainer.nativeElement, circle);
    return circle;
  }
}
