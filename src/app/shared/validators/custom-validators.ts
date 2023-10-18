import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { generateNewPassword } from '../types/form-types';

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
