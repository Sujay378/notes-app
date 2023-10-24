import { Injectable } from '@angular/core';
import { generateNewPassword } from '../types/form-types';
import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  ValidatorFn,
} from '@angular/forms';
import { Observable, timer, switchMap, map, catchError, of } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor(private _httpService: HttpService) {}

  passwordEqualityValidator = (form: generateNewPassword) => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (form.get('password')?.value) return null;
      if (form.get('confirmPassword')?.value !== form.get('password')?.value)
        return { passwordMismatch: true };
      return null;
    };
  };

  checkOnlyCharacters = () => {
    return (control: AbstractControl): ValidationErrors | null => {
      const charArray = control.value.split('');
      let error: ValidationErrors | null = null;
      for (let char of charArray) {
        if (parseInt(char)) {
          error = { notAllChar: true };
          break;
        }
      }
      return error;
    };
  };

  checkUniqueTitle = (delay: number): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(delay).pipe(
        switchMap(() => {
          return this._httpService
            .httpPost('note', 'verify', { title: control.value })
            .pipe(
              map(() => null),
              catchError(() => of({ notUnique: true }))
            );
        })
      );
    };
  };

  checkIfValueInvalid = (invalidTitles: string[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (invalidTitles.includes(control.value)) return { invalidEntry: true };
      else return null;
    };
  };
}
