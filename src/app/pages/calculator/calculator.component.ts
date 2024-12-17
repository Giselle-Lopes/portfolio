import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  calculationDisplay: string = '';
  resultDisplay: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  addToDisplay(input: string) {
    this.calculationDisplay += input;
  }

  clearDisplay() {
    this.calculationDisplay = '';
    this.resultDisplay = '';
    this.updateColors('rgb(120, 144, 156)', '#D7DFE2');
  }

  deleteOne() {
    this.calculationDisplay = this.calculationDisplay.slice(0, -1);
  }

  calculate() {
    try {
      this.resultDisplay = eval(this.calculationDisplay);
      if (this.resultDisplay !== 'undefined') {
        this.showConfetti('✨');
        this.updateColors('#DBB25D', 'rgb(249, 250, 174)');
      }
    } catch (error) {
      this.resultDisplay = "Error :(";
      this.showConfetti('❌');
      this.updateColors('#F4685C', '#F59F96');
    }
  }

  private updateColors(displayBg: string, bodyBg: string) {
    this.renderer.setStyle(this.el.nativeElement, '--bg-display', displayBg);
    this.renderer.setStyle(this.el.nativeElement.querySelector('#body'), 'background-color', bodyBg);
  }

  private showConfetti(emoji: string) {
    const confettiContainer = this.el.nativeElement.querySelector('#confetti-container');
    for (let i = 0; i < 20; i++) {
      const confetti = this.renderer.createElement('div');
      this.renderer.setProperty(confetti, 'textContent', emoji);
      this.renderer.addClass(confetti, 'confetti');
      this.renderer.setStyle(confetti, 'left', `${Math.random() * window.innerWidth}px`);
      this.renderer.setStyle(confetti, 'top', `${Math.random() * window.innerHeight}px`);
      this.renderer.appendChild(confettiContainer, confetti);

      setTimeout(() => {
        this.renderer.removeChild(confettiContainer, confetti);
      }, 5000);
    }
  }
}