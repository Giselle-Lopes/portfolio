import { Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private start: number;
  private originPosition = { x: 0, y: 0 };
  private last: any;
  private config: any;
  private count = 0;
  private mouseMoveListener?: () => void;
  private touchMoveListener?: () => void;
  private mouseLeaveListener?: () => void;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private ngZone?: NgZone
  ) {
    this.start = new Date().getTime();
    this.last = {
      starTimestamp: this.start,
      starPosition: this.originPosition,
      mousePosition: this.originPosition
    };
    this.config = {
      starAnimationDuration: 1500,
      minimumTimeBetweenStars: 250,
      minimumDistanceBetweenStars: 75,
      glowDuration: 75,
      maximumGlowPointSpacing: 10,
      colors: ["210 3 14"],
      sizes: ["1.4rem", "1rem", "0.6rem"],
      animations: ["fall-1", "fall-2", "fall-3"]
    };
  }

  ngOnInit() {
    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.removeEventListeners();
  }

  private setupEventListeners() {
    this.ngZone?.runOutsideAngular(() => {
      this.mouseMoveListener = this.renderer.listen('window', 'mousemove', (e) => this.handleOnMove(e));
      this.touchMoveListener = this.renderer.listen('window', 'touchmove', (e) => this.handleOnMove(e.touches[0]));
      this.mouseLeaveListener = this.renderer.listen('body', 'mouseleave', () => this.updateLastMousePosition(this.originPosition));
    });
  }

  private removeEventListeners() {
    this.mouseMoveListener!();
    this.touchMoveListener!();
    this.mouseLeaveListener!();
  }

  private rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private selectRandom(items: any[]): any {
    return items[this.rand(0, items.length - 1)];
  }

  private withUnit(value: number, unit: string): string {
    return `${value}${unit}`;
  }

  private px(value: number): string {
    return this.withUnit(value, "px");
  }

  private ms(value: number): string {
    return this.withUnit(value, "ms");
  }

  private calcDistance(a: { x: number, y: number }, b: { x: number, y: number }): number {
    const diffX = b.x - a.x, diffY = b.y - a.y;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  }

  private calcElapsedTime(start: number, end: number): number {
    return end - start;
  }

  private createStar(position: { x: number, y: number }) {
    const star = this.renderer.createElement('span');
    const color = this.selectRandom(this.config.colors);

    this.renderer.setProperty(star, 'textContent', '❌');
    this.renderer.addClass(star, 'star');
    this.renderer.addClass(star, 'fa-solid');
    this.renderer.addClass(star, 'fa-sparkle');

    this.renderer.setStyle(star, 'position', 'fixed');
    this.renderer.setStyle(star, 'z-index', '9999');
    this.renderer.setStyle(star, 'left', this.px(position.x));
    this.renderer.setStyle(star, 'top', this.px(position.y));
    this.renderer.setStyle(star, 'font-size', this.selectRandom(this.config.sizes));
    this.renderer.setStyle(star, 'color', `rgb(${color})`);
    this.renderer.setStyle(star, 'text-shadow', `0px 0px 1.5rem rgb(${color} / 0.5)`);
    this.renderer.setStyle(star, 'animation-name', this.config.animations[this.count++ % 3]);
    this.renderer.setStyle(star, 'animation-duration', this.ms(this.config.starAnimationDuration));

    this.renderer.appendChild(this.el.nativeElement, star);
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, star);
    }, this.config.starAnimationDuration);
  }

  private createGlowPoint(position: { x: number, y: number }) {
    const glow = this.renderer.createElement('div');

    this.renderer.addClass(glow, 'glow-point');
    this.renderer.setStyle(glow, 'left', this.px(position.x));
    this.renderer.setStyle(glow, 'top', this.px(position.y));

    this.renderer.appendChild(this.el.nativeElement, glow);
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, glow);
    }, this.config.glowDuration);
  }

  private determinePointQuantity(distance: number): number {
    return Math.max(
      Math.floor(distance / this.config.maximumGlowPointSpacing),
      1
    );
  }

  private createGlow(last: { x: number, y: number }, current: { x: number, y: number }) {
    const distance = this.calcDistance(last, current),
          quantity = this.determinePointQuantity(distance);
    
    const dx = (current.x - last.x) / quantity,
          dy = (current.y - last.y) / quantity;

    Array.from(Array(quantity)).forEach((_, index) => {
      const x = last.x + dx * index,
            y = last.y + dy * index;

      this.createGlowPoint({ x, y });
    });
  }

  private updateLastStar(position: { x: number, y: number }) {
    this.last.starTimestamp = new Date().getTime();
    this.last.starPosition = position;
  }

  private updateLastMousePosition(position: { x: number, y: number }) {
    this.last.mousePosition = position;
  }

  private adjustLastMousePosition(position: { x: number, y: number }) {
    if (this.last.mousePosition.x === 0 && this.last.mousePosition.y === 0) {
      this.last.mousePosition = position;
    }
  }

  private handleOnMove(e: MouseEvent | Touch) {
    const mousePosition = { x: e.clientX, y: e.clientY };
    this.adjustLastMousePosition(mousePosition);

    const now = new Date().getTime(),
      hasMovedFarEnough = this.calcDistance(this.last.starPosition, mousePosition) >= this.config.minimumDistanceBetweenStars,
      hasBeenLongEnough = this.calcElapsedTime(this.last.starTimestamp, now) > this.config.minimumTimeBetweenStars;

    if(hasMovedFarEnough || hasBeenLongEnough) {
      this.createStar(mousePosition);
      this.updateLastStar(mousePosition);
    }

    this.createGlow(this.last.mousePosition, mousePosition);
    this.updateLastMousePosition(mousePosition);
  }
}