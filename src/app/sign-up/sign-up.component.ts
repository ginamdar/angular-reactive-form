import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  stateOptions: string[] = ['ON', 'AB', 'QC', 'NS', 'BC'];

  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
      confirmPassword: new FormControl(""),
        address: new FormGroup({
          street: new FormControl(""),
          city: new FormControl(""),
          state: new FormControl(""),
          postalCode: new FormControl(""),
        })
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
