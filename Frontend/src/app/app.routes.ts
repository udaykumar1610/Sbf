import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';

// export const routes: Routes = [];
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' }
  ];