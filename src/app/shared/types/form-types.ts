import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type noteForm = FormGroup<{
  noteTitle: FormControl;
  pages: FormArray<notePage>;
}>;

export type notePage = FormGroup<{
  pageTitle: FormControl;
  sections: FormArray<pageSection>;
}>;

export type pageSection = FormGroup<{
  header: FormControl;
  body: FormControl;
}>;

export type generateNewPassword = FormGroup<{
  password: FormControl;
  confirmPassword: FormControl;
}>;
