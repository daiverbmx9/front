import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
// Impor user model for register new user
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NgForm, EmailValidator } from '@angular/forms';

@Component({
  selector: 'f-register',
  templateUrl: 'register.template.html',
  styles: [],
  providers: [UserService, EmailValidator]
})
export class RegisterComponent implements OnInit {

  // Instance of user
  public user:User;
  // This variable is used for compar with the password
  public repeatPassword:string;

  constructor(private router:Router, private snackBar:MatSnackBar, private _userService: UserService)
  {
    this.user = new User();
  }

  ngOnInit() {
  }

  // This function is called when form is submit
  register(f: NgForm)
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

    if (f.form.controls.repeatpassword.status == 'INVALID')
    {
      this.openSnackBar('Debe repetir la contraseña', 'Cerrar');
      return;
    }

    if (this.repeatPassword != this.user.password)
    {
      this.openSnackBar('Las contraseñas deben coincidir', 'Cerrar');
      return;
    }

    this.commitRegister();
  }

  // This function is used for subscribe into register method of service
  commitRegister()
  {
    this._userService.register(this.user).subscribe(response => 
      {
        if (response['status'] == 204)
        {
          this.openSnackBar(this.user.email + ' ya está siendo usado.', 'Cerrar');
          return;
        }

        this.router.navigate(['/login']);
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
