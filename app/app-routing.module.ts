import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import{SignupComponent} from '../app/signup/signup.component';
import{RestaurentDashComponent} from './restaurent-dash/restaurent-dash.component'
const routes: Routes = [
  {path:'',redirectTo: 'login',pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path:'restaurent-dash',component: RestaurentDashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }