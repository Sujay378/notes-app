import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { noteForm, notePage } from '../../../shared/types/form-types';
import { AppState } from 'src/app/shared/models/store.model';
import { Store } from '@ngrx/store';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  @ViewChild('tabGroup', { static: false }) tabGroupRef!: MatTabGroup;

  form!: noteForm;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      noteTitle: ['', [Validators.required]],
      pages: this.fb.array([
        this.fb.group({
          pageTitle: ['', [Validators.maxLength(30)]],
          sections: this.fb.array([
            this.fb.group({
              header: ['', [Validators.maxLength(20)]],
              body: ['', [Validators.required]],
            }),
          ]),
        }),
      ]),
    });
  }

  addEmptyPage() {
    this.form.controls.pages.push(this.createPageControl());
    setTimeout(
      () => (this.tabGroupRef.selectedIndex = this.tabGroupRef._tabs.length - 1)
    );
  }

  createPageControl(): notePage {
    return this.fb.group({
      pageTitle: ['', [Validators.maxLength(30)]],
      sections: this.fb.array([
        this.fb.group({
          header: ['', [Validators.maxLength(20)]],
          body: ['', [Validators.required]],
        }),
      ]),
    });
  }

  get pages() {
    return this.form.controls.pages.controls;
  }

  onDeleteOfPage(index: number) {
    this.form.controls.pages.controls.splice(index, 1);
  }

  submitNote() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }
}
