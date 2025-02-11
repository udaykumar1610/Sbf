import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserschemsComponent } from './userschems/userschems.component';
import { EducationschemeComponent } from './educationscheme/educationscheme.component';
import { SicknessschemeComponent } from './sicknessscheme/sicknessscheme.component';
import { SkilldevelopmentschemeComponent } from './skilldevelopmentscheme/skilldevelopmentscheme.component';

// export const routes: Routes = [];
export const routes: Routes = [
    { path: 'login', component: LoginComponent ,},
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'schema', component: UserschemsComponent },
    { path: 'education', component: EducationschemeComponent },
    { path: 'sickness', component: SicknessschemeComponent },
    { path: 'skills', component: SkilldevelopmentschemeComponent },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home',pathMatch: 'full'  }
  ];