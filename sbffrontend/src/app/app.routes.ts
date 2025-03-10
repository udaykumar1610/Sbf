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
import { IndigenousSystemComponent } from './indigenous-system/indigenous-system.component';
import { RecreationAmusementComponent } from './recreation-amusement/recreation-amusement.component';
import { ScholarlistComponent } from './List/scholarlist/scholarlist.component';
import { KithkinlistComponent } from './List/kithkinlist/kithkinlist.component';
import { ScholardivComponent } from './Division/scholardiv/scholardiv.component';
import { KithkindivComponent } from './Division/kithkindiv/kithkindiv.component';
import { KithkinsrdpoComponent } from './srdpo/kithkinsrdpo/kithkinsrdpo.component';
import { ScholarsrdpoComponent } from './srdpo/scholarsrdpo/scholarsrdpo.component';
import { SpectaclesListComponent } from './List/spectacles-list/spectacles-list.component';
import { SpectaclesDivComponent } from './Division/spectacles-div/spectacles-div.component';
import { SpectacleSrdpoComponent } from './srdpo/spectacle-srdpo/spectacle-srdpo.component';
import { DenturesListComponent } from './List/dentures-list/dentures-list.component';
import { DenturesDivComponent } from './Division/dentures-div/dentures-div.component';
import { DenturesSrdpoComponent } from './srdpo/dentures-srdpo/dentures-srdpo.component';
import { MaintenanceListComponent } from './List/maintenance-list/maintenance-list.component';
import { MaintenanceDivComponent } from './Division/maintenance-div/maintenance-div.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MaintenaceSrdpoComponent } from './srdpo/maintenace-srdpo/maintenace-srdpo.component';
import { MedicalListComponent } from './List/medical-list/medical-list.component';
import { MedicalAssistanceService } from './servicesForm/medical-assistance.service';
import { MedicalDevComponent } from './Division/medical-dev/medical-dev.component';
import { MedicalSrdpoComponent } from './srdpo/medical-srdpo/medical-srdpo.component';
import { MotorizedListComponent } from './List/motorized-list/motorized-list.component';
import { MotorizedDivComponent } from './Division/motorized-div/motorized-div.component';
import { MotorizedSrdpoComponent } from './srdpo/motorized-srdpo/motorized-srdpo.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PhysicallchallengedListComponent } from './List/physicallchallenged-list/physicallchallenged-list.component';
import { PhysicallyChallengedDivComponent } from './Division/physically-challenged-div/physically-challenged-div.component';
import { PhysicallyChallengedSrdpoComponent } from './srdpo/physically-challenged-srdpo/physically-challenged-srdpo.component';
import { DeafMentalListComponent } from './List/deaf-mental-list/deaf-mental-list.component';
import { DeafMentalDivComponent } from './Division/deaf-mental-div/deaf-mental-div.component';
import { DeafSrdpoComponent } from './srdpo/deaf-srdpo/deaf-srdpo.component';

// export const routes: Routes = [];
export const routes: Routes = [
    { path: 'login', component: LoginComponent ,},
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'schema', component: UserschemsComponent },
    { path: 'education', component: EducationschemeComponent },
    { path: 'sickness', component: SicknessschemeComponent },
    { path: 'skills', component: SkilldevelopmentschemeComponent },
    { path: 'indigenous', component: IndigenousSystemComponent },
    { path: 'amusement', component: RecreationAmusementComponent },
    

    { path: 'supervisor-dashboard', component: SupervisordashboardComponent },
    { path: 'editProfile', component: EditProfileComponent },
    { path: 'user-dashboard', component: UserDashboardComponent,
      children: [
        { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' }, // Default redirect to scholarList
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
       
      
      ]
      },


    {
      path: 'supervisor-dashboard',
      component: SupervisordashboardComponent,
      children: [
        { path: '', redirectTo: 'scholarList', pathMatch: 'full' }, // Default redirect to scholarList
        { path: 'scholarList', component: ScholarlistComponent },
        { path: 'kithkinList', component: KithkinlistComponent },
        { path: 'spectacelList', component: SpectaclesListComponent },
        { path: 'denturesList', component: DenturesListComponent },
        { path: 'maintenanceGrantList', component: MaintenanceListComponent },
        { path: 'medicalList', component: MedicalListComponent },
        { path: 'motorizedList', component: MotorizedListComponent },
        { path: 'physicallyChallengedList', component: PhysicallchallengedListComponent },
        { path: 'deafList', component: DeafMentalListComponent },
        
      ]
    },


    { path: 'division-dashboard', component: DivisiondashboardComponent,
      children: [
        { path: '', redirectTo: 'division-dashboard', pathMatch: 'full' }, // Default redirect to scholarList
        { path: 'scholardiv', component: ScholardivComponent },
        { path: 'kithkindiv', component: KithkindivComponent },
        { path: 'spectacelDiv', component: SpectaclesDivComponent },
        { path: 'dentureDiv', component: DenturesDivComponent },
        { path: 'maintenanceGrantDiv', component: MaintenanceDivComponent },
        { path: 'medicalDiv', component: MedicalDevComponent },
        { path: 'motorizedDiv', component: MotorizedDivComponent },
        { path: 'physicallyChallengedDiv', component: PhysicallyChallengedDivComponent },
        { path: 'deafDiv', component: DeafMentalDivComponent },
      ]

     },
    { path: 'pc-dashboard', component: PersonnelDepartmentDashboardComponent },
    { path: 'spo-dashboard', component: SpodashboardComponent },
    { path: 'dypco-dashboard', component: DycpodashboardComponent },
    { path: 'pcpo-dashboard', component: PcpodashboardComponent },
    { path: 'srdpo-dashboard', component: SrdpodashboardComponent ,
      children: [
        { path: '', redirectTo: 'srdpo-dashboard', pathMatch: 'full' }, // Default redirect to scholarList
        { path: 'scholarsrdpo', component: ScholarsrdpoComponent },
        { path: 'kithkinsrdpo', component: KithkinsrdpoComponent },
        { path: 'spectacleSrdpo', component: SpectacleSrdpoComponent },
        { path: 'dentureSrdpo', component: DenturesSrdpoComponent },
        { path: 'maintenanceSrdpo', component: MaintenaceSrdpoComponent },
        { path: 'medicalSrdpo', component: MedicalSrdpoComponent },
        { path: 'motorizedSrdpo', component: MotorizedSrdpoComponent },
        { path: 'physicallychallengedSrdpo', component: PhysicallyChallengedSrdpoComponent },
        { path: 'deafSrdpo', component: DeafSrdpoComponent },
      ]

    },


    // { path: 'scholarship', component: ScholarshipFormComponent },
    // { path: 'denture', component: DenturesFormComponent },
    // { path: 'spectacle', component: SpectaclesFormComponent },
    // { path: 'medical', component: MedicalFormComponent },
    // { path: 'maintenance', component: MaintenanceGrantFormComponent },
    // { path: 'motor', component: MotorizedTricycleFormComponent },
    // { path: 'physically', component: PhysicallyChallengedFormComponent },
    // { path: 'deafmental', component: DeafMentalFormComponent },
    // { path: 'kithkin', component: KithkinFormComponent },
    // { path: 'familyNorms', component: FamilyDetailsFormComponent },


    {path:"scholarList",component:ScholarlistComponent},
    {path:"kithkinList",component:KithkinlistComponent},

    // { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home',pathMatch: 'full'  }
  ];