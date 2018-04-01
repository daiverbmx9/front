import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'p-login-master',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class LoginMasterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') != null)
    {
      this.router.navigate(['']);
    }
  }

}
