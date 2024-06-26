import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/ApiComponent/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoachesComponent } from './components/ApiComponent/coaches/coaches.component';

// Routes for child Module (publicModule). Since public module is lazy loaded in in the 
// app-routing.module the full path is `/public/login` or `/public/regiser`
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'coaches',
    component: CoachesComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
