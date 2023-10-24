import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { generateNewPassword } from '../types/form-types';
import { map, switchMap, timer, catchError, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { HttpService } from '../services/http.service';

export const passwordEqualityValidator = (form: generateNewPassword) => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (form.get('confirmPassword')?.value !== form.get('password')?.value)
      return { passwordMismatch: true };
    return null;
  };
};

export const checkOnlyCharacters = () => {
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

export const checkUniqueTitle = (): AsyncValidatorFn => {
  const httpService = inject(HttpService);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(500).pipe(
      switchMap(() => {
        return httpService
          .httpPost('note', 'verify', { title: control.value })
          .pipe(
            map(() => null),
            catchError(() => of({ notUnique: true }))
          );
      })
    );
  };
};
