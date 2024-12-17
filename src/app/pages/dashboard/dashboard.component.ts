import { NgFor } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stars: { left: number, duration: number }[] = [];

  ngOnInit() {
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        left: Math.random() * 100,
        duration: 3 + Math.random() * 7
      });
    }
  }

  private config = [
    {
      transform: { x: 0, y: 0, z: 0 },
      rotate: { x: 25, y: 25 }
    },
    {
      transform: { x: -25, y: -25, z: 10 },
      rotate: { x: 0, y: 0 }
    },
    {
      transform: { x: -25, y: -25, z: 40 },
      rotate: { x: 0, y: 0 }
    },
    {
      transform: { x: -10, y: -15, z: 25 },
      rotate: { x: 0, y: 0 }
    },
    {
      transform: { x: -10, y: -15, z: 25 },
      rotate: { x: 0, y: 0 }
    },
    {
      transform: { x: -15, y: -15, z: 15 },
      rotate: { x: 0, y: 0 }
    }] as Array<ConfigModel>;


  @ViewChild('parallaxRef') parallaxRef!: ElementRef;

  private get parallax(): HTMLDivElement {
    return this.parallaxRef.nativeElement as HTMLDivElement;
  }

  @ViewChildren('ref') ref!: QueryList<ElementRef>;

  @HostListener('mousemove', ['$event'])
  public mouseMove(event: MouseEvent): void {
    if (event) {
      const rect = this.parallax.getBoundingClientRect();
      let a1 = rect.left;
      let a2 = a1 + rect.width;
      let b1 = -1.5;
      let b2 = 1.5;
      const x = this.mapRange(a1, a2, b1, b2, event.x);
      a1 = rect.top;
      a2 = a1 + rect.height;
      b1 = 1.5;
      b2 = -1.5;
      const y = this.mapRange(a1, a2, b1, b2, event.y);

      if (x <= 1.5 && x >= -1.5 && y <= 1.5 && y >= -1.5) {
        this.ref.forEach((element, index) => {
          this.applyStyle(this.config[index], element, { x, y, z: 1 });
        });
      }
    }
  }

  public reset(): void {
    this.ref.forEach((element) => {
      this.clearStyle(element);
    });
  }

  private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
    return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
  }

  private applyStyle(config: ConfigModel, el: ElementRef, pos: PosModel3D): void {
    const element = el.nativeElement as HTMLElement;

    element.style.transform = `
      translate3d(${config.transform.x * -pos.x}px,
      ${config.transform.y * pos.y}px,
      ${config.transform.z * pos.z}px)
      rotateX(${config.rotate.x * pos.y}deg)
      rotateY(${config.rotate.y * pos.x}deg)`;
    element.style.transition = 'none';
  }

  private clearStyle(el: ElementRef): void {
    const element = el.nativeElement as HTMLElement;
    element.style.transform = `none`;
    element.style.transition = 'all 0.75s ease';
  }
}

interface ConfigModel {
  transform: PosModel3D;
  rotate: PosModel2D;
}

interface PosModel2D {
  x: number;
  y: number;
}

interface PosModel3D extends PosModel2D {
  z: number;
}
