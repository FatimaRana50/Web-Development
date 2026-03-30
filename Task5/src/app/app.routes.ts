import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { HomeComponent } from './home/home';
import { AboutComponent } from './about/about';
import { FeedbackComponent } from './feedback/feedback';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];