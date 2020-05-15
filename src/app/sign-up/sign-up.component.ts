import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
      confirmPassword: new FormControl(""),
    });
  }

  clear() {
    // this.username.reset();
    // this.username.setValue("");
    this.userForm.reset();
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
