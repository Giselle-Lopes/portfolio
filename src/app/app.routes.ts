import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'challenges/calculator', component: CalculatorComponent },
    { path: 'challenges/404', component: NotFoundComponent }
];
