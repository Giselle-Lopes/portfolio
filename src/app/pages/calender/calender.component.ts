import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
  private currentDate = new Date();
  private currentYear = this.currentDate.getFullYear();
  private currentMonth = this.currentDate.getMonth();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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

  private displayCalender() {
    const display = this.el.nativeElement.querySelector('.display');
    const days = this.el.nativeElement.querySelector('.days');

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const numberOfDays = lastDay.getDate();

    this.setColors();

    let formattedDate = new Date(this.currentYear, this.currentMonth).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    display.innerHTML = formattedDate;

    for (let x = 1; x <= firstDayIndex; x++) {
      let div = document.createElement("div");
      div.innerHTML += "";
      days.appendChild(div)
    }

    for (let i = 1; i <= numberOfDays; i++) {
      let div = this.renderer.createElement("div");
      let currentDate = new Date(this.currentYear, this.currentMonth, i);
      let dateString = currentDate.toDateString();
  
      div.dataset['date'] = dateString;
  
      this.renderer.setProperty(div, 'textContent', i.toString());
      this.renderer.appendChild(days, div);
  
      if (
        currentDate.getFullYear() === new Date().getFullYear() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getDate() === new Date().getDate()
      ) {
        this.renderer.addClass(div, "current-date");
      }
  
      if (this.events[dateString] && this.events[dateString].length > 0) {
        let indicator = this.renderer.createElement("span");
        this.renderer.addClass(indicator, "event-indicator");
        this.renderer.appendChild(div, indicator);
      }
    }
  }

  private setColors() {
    const month = this.currentMonth;
    let season: string;
    
    interface ColorScheme {
      accent: string;
      'accent-2': string;
      'arrow-hover': string;
      font: string;
      'font-2': string;
      background: string;
      'background-days': string;
    }

    let colors: ColorScheme;

    if (month >= 2 && month <= 4) {
      season = 'spring';
    } else if (month >= 5 && month <= 7) {
      season = 'summer';
    } else if (month >= 8 && month <= 10) {
      season = 'fall';
    } else {
      season = 'winter';
    }

    switch(season) {
      case 'spring':
        colors = {
          accent: '#6170D8',
          'accent-2': '#FF4D78',
          'arrow-hover': '#FF4D78',
          font: '#B32446',
          'font-2': 'white',
          background: '#BEBFFA',
          'background-days': 'radial-gradient(circle, #DBDBDB 0%, #FFABC5 50%, #6170D8 100%)'
        };
        break;
      case 'summer':
        colors = {
          accent: '#F20505',
          'accent-2': '#F2CD5C',
          'arrow-hover': '#0644BF',
          font: '#2E3159',
          'font-2': 'white',
          background: '#F2CD5C',
          'background-days': 'radial-gradient(circle, #F2E313 0%, #05AFF2 50%, #0644BF 100%)'
        };
        break;
      case 'fall':
        colors = {
          accent: '#D95204',
          'accent-2': '#FF8F05',
          'arrow-hover': '#FF8F05',
          font: '#381001',
          'font-2': 'white',
          background: '#8C2703',
          'background-days': 'radial-gradient(circle, #F2D027 0%, #D99E30 50%, #A65D03 100%)'
        };
        break;
      case 'winter':
        colors = {
          accent: '#253B59',
          'accent-2': '#253B59',
          'arrow-hover': '#253B59',
          font: '#141C26',
          'font-2': 'white',
          background: '#7C8EA6',
          'background-days': 'radial-gradient(circle, #7C8EA6 0%, #465973 50%, #435C7A 100%)'
        };
        break;
    }

    (Object.entries(colors!) as [keyof ColorScheme, string][]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    const bgImages = [
      'url("https://i.imgur.com/jneEWBR.jpeg")',
      'url("https://www.gamespot.com/a/uploads/original/1430/14303732/3489718-lis2_nologothumb2.jpg")',
      'url("https://cdnb.artstation.com/p/assets/images/images/002/593/143/large/reuben-shah-screenshot-07222013-223409.jpg?1463464489")',
      'url("https://i.imgur.com/nlEmOTI.jpeg")',
      'url("https://i0.wp.com/puredeadgaming.com/wp-content/uploads/2021/09/LISfeat.jpg?resize=860%2C430&ssl=1")',
      'url("https://images.axios.com/0-D4OnV_YAy7TDLsxTfdJgEQgoU=/0x0:3840x2160/1920x1080/2020/06/18/1592515383294.jpg")',
      'url("https://i.imgur.com/QiQjOvr.jpeg")',
      'url("https://static.wikia.nocookie.net/life-is-strange/images/5/5c/Cliff_beach.png/revision/latest/scale-to-width-down/1000?cb=20170823111204")',
      'url("https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-last-of-us/5/53/The_Last_of_Us%E2%84%A2_Part_I_20220915040446.jpg?width=1280")',
      'url("https://i.imgur.com/fv0x33W.jpeg")',
      'url("https://gh.cdn.sewest.net/assets/ident/news/life-strange-interview-party-2/en_GB/lis2-view.jpg?quality=65")',
      'url("https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-last-of-us/2/23/The_Last_of_Us%E2%84%A2_Part_I_20220915180821.jpg?width=640")'
    ];

    (document.documentElement.style as any).setProperty('--bg-img', bgImages[month]);
  }

  private previousMonth() {
    this.currentMonth--;
    if (this,this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.updateCalender();
  }

  private nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.updateCalender();
    let currentEmoji = this.getEmojiByMonth();
    this.showConfetti(currentEmoji);
  }

  private updateCalender() {
    const days = this.el.nativeElement.querySelector('.days');
    const selected = this.el.nativeElement.querySelector('.selected');

    days.innerHTML = "";
    selected.innerHTML = "";
    document.documentElement.style.setProperty('--button-display', 'none');
    document.documentElement.style.setProperty('--input-display', 'none');

    this.displayCalender();
    this.displaySelected();
    this.setColors();
  }
  
  private getEmojiByMonth() {
    let month = this.currentMonth;
    
    if (month === 2 || month === 3 || month === 4) {
      return "🌺";
    } else if (month === 5 || month === 6 || month === 7) {
      return "🍃";
    } else if (month === 8 || month === 9 || month === 10) {
      return "🍁";
    } else {
      return "❄️";
    }
  }
  
  private displaySelected() {
    const dayElements = this.el.nativeElement.querySelectorAll('.days div');
    let selected = this.el.nativeElement.querySelector('.selected');
  
    dayElements.forEach((day: HTMLElement) => {
      day.addEventListener('click', (e: MouseEvent) => {
        const selectedDate = (e.target as HTMLElement).dataset['date'];
        if (selectedDate) {
          selected.innerHTML = `${selectedDate}`;
          document.documentElement.style.setProperty('--button-display', 'flex');
          this.showInput();
          this.showExistingEvents(selectedDate);
        }
      });
    });
  }

  private showExistingEvents(date: string) {
    const eventDiv = this.el.nativeElement.querySelector('.event');
    eventDiv.innerHTML = '';
  
    const events = this.getEventsForDate(date);
    events.forEach(event => {
      this.createEventElement(event, date);
    });
  }

  addEvent() {
    const inputField = this.el.nativeElement.querySelector('.typed-event') as HTMLInputElement;
    const selected = this.el.nativeElement.querySelector('.selected');
    let inputValue = inputField.value.trim();
    let selectedDate = selected.innerHTML;
  
    if (inputValue !== "" && selectedDate) {
      this.createEventElement(inputValue, selectedDate);
      this.saveEvent(inputValue, selectedDate);
  
      inputField.value = "";
      document.documentElement.style.setProperty('--input-display', 'none');
    }
  }

  private events: { [date: string]: string[] } = {};

  private saveEvent(event: string, date: string) {
    if (!this.events[date]) {
      this.events[date] = [];
    }
    this.events[date].push(event);
  }

  private getEventsForDate(date: string): string[] {
    return this.events[date] || [];
  }

  private createEventElement(event: string, date: string) {
    const eventDiv = this.el.nativeElement.querySelector('.event');
    let eventContainer = this.renderer.createElement('div');
    let eventText = this.renderer.createElement('p');

    this.renderer.setProperty(eventText, 'textContent', event);
    this.renderer.appendChild(eventContainer, eventText);
    this.renderer.appendChild(eventDiv, eventContainer);

    let deleteButton = this.renderer.createElement('button');
    this.renderer.setProperty(deleteButton, 'textContent', '-');

    this.renderer.appendChild(eventContainer, deleteButton);

    this.renderer.listen(deleteButton, 'click', () => {
      this.renderer.removeChild(eventDiv, eventContainer);
      this.removeEvent(event, date);
    });
  }

  private removeEvent(event: string, date: string) {
    if (this.events[date]) {
      this.events[date] = this.events[date].filter(e => e !== event);
    }
  }

  showInput() {
    document.documentElement.style.setProperty('--input-display', 'flex');
    const inputField = this.el.nativeElement.querySelector('.typed-event') as HTMLInputElement;
    if (inputField) {
      inputField.style.display = 'block';
      inputField.focus();
    } else {
      console.log('Input field not found')
    }
  }
  
  ngOnInit() {
    const previous = this.el.nativeElement.querySelector('.left');
    const next = this.el.nativeElement.querySelector('.right');

    previous.addEventListener('click', () => this.previousMonth());
    next.addEventListener('click', () => this.nextMonth());
    
    this.displayCalender();
    this.displaySelected();
  }
}
