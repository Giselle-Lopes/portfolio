import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'challenges', component: ChallengesComponent },
    { path: 'challenges/calculator', component: CalculatorComponent }
];
