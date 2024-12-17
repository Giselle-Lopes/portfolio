import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkTheme = new BehaviorSubject<boolean>(false);
    isDarkTheme = this.darkTheme.asObservable();

    toggleTheme() {
        this.darkTheme.next(!this.darkTheme.value);
        document.documentElement.classList.toggle('dark');
    }
}