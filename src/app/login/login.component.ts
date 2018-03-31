import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'f-login',
  templateUrl: 'login.template.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router)
  {
  }

  ngOnInit() {
  }

}
