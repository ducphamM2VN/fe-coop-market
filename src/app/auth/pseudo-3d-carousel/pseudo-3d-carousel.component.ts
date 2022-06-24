import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  style,
  animate,
  AnimationBuilder,
  AnimationPlayer,
} from "@angular/animations";

@Component({
  selector: "pseudo-3d-carousel",
  templateUrl: "./pseudo-3d-carousel.component.html",
  styleUrls: ["./pseudo-3d-carousel.component.scss"],
})
export class Pseudo3dCarouselComponent {
  @ViewChildren("element") itemsView: QueryList<ElementRef>;
  private player: AnimationPlayer;

  @Input() radius: number;
  @Input() timer = 250;
  @Input() top: number = -90;
  @Input() minScale: number = 0.5;
  @Input() images: string[];

  @Output() select: EventEmitter<number> = new EventEmitter<number>();

  animates = [0, 2, 4, 12, 14];
  cellWidth: number;
  marginTop: number = -(this.top * this.minScale - this.top) / 3;

  movements = [
    { pos: 0, right: [1, 2], left: [15, 14] },
    { pos: 2, right: [3, 4], left: [1, 0] },
    { pos: 4, right: [5, 6, 7, 8, 9, 10, 11, 12], left: [3, 2] },
    { pos: 12, right: [13, 14], left: [11, 10, 9, 8, 7, 6, 5, 4] },
    { pos: 14, right: [15, 0], left: [13, 12] },
  ];
  movementsTwo = [
    { pos: 0, right: [1, 2, 3, 4], left: [15, 14, 13, 12] },
    { pos: 2, right: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], left: [1, 0, 15, 14] },
    { pos: 4, right: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], left: [3, 2, 1, 0] },
    { pos: 12, right: [13, 14, 15, 0], left: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2] },
    { pos: 14, right: [15, 0, 1, 2], left: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4] },
  ];

  constructor(private builder: AnimationBuilder) {}
  indexToFront(index: any) {
    index = +index;
    if (this.animates[index] != 0) {
      const pos = this.animates[+index];
      if (pos) {
        const mov = this.movements.find((x) => x.pos == pos);
        const mov2 = this.movementsTwo.find((x) => x.pos == pos);
        const direction =
          mov.left[mov.left.length - 1] == 0 ||
          mov2.left[mov2.left.length - 1] == 0
            ? "left"
            : "right";
        const steps =
          mov2.left[mov2.left.length - 1] == 0 ||
          mov2.right[mov2.right.length - 1] == 0
            ? 2
            : 1;

        this.animateViews(direction, steps);
      }
    }
    this.select.emit(index);
  }

  animateViews(direction: string, steps: number = 1) {
    this.animates.forEach((x: number, index: number) => {
      const movements = steps == 1 ? this.movements : this.movementsTwo;
      const mov = movements.find((m) => m.pos == x);
      const item = this.itemsView.find((_x, i) => i == index);
      const animations = mov[direction].map((m) => {
        const angle = (m * 2 * Math.PI) / 16;
        const scale =
          (1 + this.minScale) / 2 + ((1 - this.minScale) / 2) * Math.cos(angle);
        const applystyle = {
          transform:
            "translate(" +
            this.radius * Math.sin(angle) +
            "px," +
            (Math.floor(this.top * scale) - this.top) +
            "px) scale(" +
            scale +
            ")",
          "z-index": Math.floor(100 * scale),
        };
        return animate(
          this.timer / mov[direction].length + "ms",
          style(applystyle)
        );
      });

      const myAnimation = this.builder.build(animations);
      this.player = myAnimation.create(item.nativeElement);
      this.player.onDone(() => {
        this.animates[index] = mov[direction][mov[direction].length - 1];
      });
      this.player.play();
    });
  }

  prev() {
    this.animateViews("right");
  }
  next() {
    this.animateViews("left");
  }

  getDimensions(el: HTMLElement) {
    this.cellWidth = el.offsetWidth;
    this.radius = this.radius || this.cellWidth  -50;
    this.marginTop = -(this.top * this.minScale - this.top);
    this.animateViews("left");
  }
}
