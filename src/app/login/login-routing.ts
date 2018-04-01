import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginMasterComponent } from './login-master.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path : "",
    component : LoginMasterComponent,
    children :
    [
      {
        path : "",
        component : LoginComponent
      },
      {
        path : "login",
        component : LoginComponent
      },
      {
        path : "register",
        component : RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
