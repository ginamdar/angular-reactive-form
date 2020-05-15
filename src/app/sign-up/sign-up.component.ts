import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  stateOptions: string[] = ['ON', 'AB', 'QC', 'NS', 'BC'];

  userInfoAddress: any = {
    street: '122 Main St.',
    city: 'Kitchener',
    state: this.stateOptions[0],
    postalCode: 'N2A 4K5'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: [''],
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

  prefillAddress() {
    this.userForm.patchValue({
      address: {
        street: this.userInfoAddress.street,
        city: this.userInfoAddress.city,
        state: this.userInfoAddress.state,
        postalCode: this.userInfoAddress.postalCode
      }
    })
  }
}
