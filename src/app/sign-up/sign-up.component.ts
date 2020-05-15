import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidationService} from '../services/custom-validation.service';

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

  constructor(private fb: FormBuilder, private customValidator: CustomValidationService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        this.customValidator.validateUsernameNotTaken.bind(this.customValidator)
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: [''],
      })
    }, {
      validator: this.customValidator.passwordMatchValidator(
        'password', 'confirmPassword'
      )
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
