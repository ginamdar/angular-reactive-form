import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(private http: HttpClient) { }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  validateUsernameNotTaken(control: AbstractControl) {
    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true };
      })
    );
  }

  //Fake API call -- You can have this in another service
  checkUsernameNotTaken(username: string) {
    return this.http.get('assets/fakedb.json')
      .pipe(
        map((usernameList: Array<any>) =>
          usernameList.filter(user => user.username === username)
        ),
        tap((users ) => console.log(users)),
        map(users => !users.length),
      );
  }
}
