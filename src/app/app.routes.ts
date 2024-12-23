import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'challenges/calculator', component: CalculatorComponent },
    { path: 'challenges/404', component: NotFoundComponent },
    { path: 'challenges/calendar', component: CalendarComponent },
    { path: 'challenges/collections', component: CollectionsComponent }
];
