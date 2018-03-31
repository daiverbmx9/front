import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
// Impor user model for register new user
import { User } from './models/user';
import { UserService } from './services/user.service';
import { NgForm, EmailValidator } from '@angular/forms';

@Component({
  selector: 'f-login',
  templateUrl: 'login.template.html',
  styles: [
  ],
  providers: [UserService, EmailValidator]
})
export class LoginComponent implements OnInit {

  // Instance of user
  public user:User;

  constructor(private router:Router, private snackBar:MatSnackBar, private _userService: UserService)
  {
    this.user = new User();
  }

  ngOnInit() {
  }

  // This function is called when form is submit
  login(f: NgForm)
  {
    if (f.form.controls.email.status == 'INVALID')
    {
      this.openSnackBar('Formato de email invalido.', 'Cerrar');
      return;
    }

    if (f.form.controls.password.status == 'INVALID')
    {
      this.openSnackBar('Debe ingresar una contraseña', 'Cerrar');
      return;
    }

    this.commitLogin();
  }

  // This function is used for subscribe into login method of service
  commitLogin()
  {
    this._userService.login(this.user).subscribe(response => 
      {
        if (response['status'] == 204)
        {
          this.openSnackBar('Correo o contraseña incorrectos.', 'Cerrar');
          return;
        }

        localStorage.setItem('user', JSON.stringify(response['user']));
        this.router.navigate(['/home']);
      }, error => 
      {
        console.log(error);
      });
  }

  // This function is used for show alert message
  openSnackBar(message: string, action: string)
  {
    this.snackBar.open(message, action,
    {
      duration: 2000,
    });
  }

}
