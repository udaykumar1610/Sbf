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
import { PersonnelDepartmentDashboardComponent } from './dashboard/personnel-department-dashboard/personnel-department-dashboard.component';
import { SpodashboardComponent } from './dashboard/spodashboard/spodashboard.component';
import { DycpodashboardComponent } from './dashboard/dycpodashboard/dycpodashboard.component';
import { PcpodashboardComponent } from './dashboard/pcpodashboard/pcpodashboard.component';
import { SupervisordashboardComponent } from './dashboard/supervisordashboard/supervisordashboard.component';
import { DivisiondashboardComponent } from './dashboard/divisiondashboard/divisiondashboard.component';
import { ScholarshipFormComponent } from './forms/scholarship-form/scholarship-form.component';
import { DenturesFormComponent } from './forms/dentures-form/dentures-form.component';
import { SpectaclesFormComponent } from './forms/spectacles-form/spectacles-form.component';
import { MedicalFormComponent } from './forms/medical-form/medical-form.component';
import { MaintenanceGrantFormComponent } from './forms/maintenance-grant-form/maintenance-grant-form.component';
import { MotorizedTricycleFormComponent } from './forms/motorized-tricycle-form/motorized-tricycle-form.component';
import { PhysicallyChallengedFormComponent } from './forms/physically-challenged-form/physically-challenged-form.component';
import { DeafMentalFormComponent } from './forms/deaf-mental-form/deaf-mental-form.component';
import { KithkinFormComponent } from './forms/kithkin-form/kithkin-form.component';
import { FamilyDetailsFormComponent } from './forms/family-details-form/family-details-form.component';
import { SrdpodashboardComponent } from './dashboard/srdpodashboard/srdpodashboard.component';

// export const routes: Routes = [];
export const routes: Routes = [
    { path: 'login', component: LoginComponent ,},
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'schema', component: UserschemsComponent },
    { path: 'education', component: EducationschemeComponent },
    { path: 'sickness', component: SicknessschemeComponent },
    { path: 'skills', component: SkilldevelopmentschemeComponent },

    { path: 'supervisor-dashboard', component: SupervisordashboardComponent },
    { path: 'division-dashboard', component: DivisiondashboardComponent },
    { path: 'pc-dashboard', component: PersonnelDepartmentDashboardComponent },
    { path: 'spo-dashboard', component: SpodashboardComponent },
    { path: 'dypco-dashboard', component: DycpodashboardComponent },
    { path: 'pcpo-dashboard', component: PcpodashboardComponent },
    { path: 'srdpo-dashboard', component: SrdpodashboardComponent },

    { path: 'scholarship', component: ScholarshipFormComponent },
    { path: 'denture', component: DenturesFormComponent },
    { path: 'spectacle', component: SpectaclesFormComponent },
    { path: 'medical', component: MedicalFormComponent },
    { path: 'maintenance', component: MaintenanceGrantFormComponent },
    { path: 'motor', component: MotorizedTricycleFormComponent },
    { path: 'physically', component: PhysicallyChallengedFormComponent },
    { path: 'deafmental', component: DeafMentalFormComponent },
    { path: 'kithkin', component: KithkinFormComponent },
    { path: 'familyNorms', component: FamilyDetailsFormComponent },

    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home',pathMatch: 'full'  }
  ];