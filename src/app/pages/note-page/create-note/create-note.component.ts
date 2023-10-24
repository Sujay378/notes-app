import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { noteForm, notePage } from '../../../shared/types/form-types';
import { AppState } from 'src/app/shared/models/store.model';
import { Store } from '@ngrx/store';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Data, Params } from '@angular/router';
import {
  getSingleGuestNote,
  getSingleUserNote,
  isUserLogged,
} from 'src/app/store';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  @ViewChild('tabGroup', { static: false }) tabGroupRef!: MatTabGroup;

  form!: noteForm;
  userLogged: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private _route: ActivatedRoute
  ) {}

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

    this.store
      .select(isUserLogged)
      .subscribe((value) => (this.userLogged = value))
      .unsubscribe();

    this._route.data.subscribe((data: Data) => {
      if (data['title']) {
        this.form.patchValue({ noteTitle: data['title'] });
      }
    });

    this._route.params.subscribe((params: Params) => {
      const title = params['title'];
      const fn = (note) => note && this.form.patchValue(note);
      if (this.userLogged)
        this.store.select(getSingleUserNote(title)).subscribe(fn).unsubscribe();
      else
        this.store
          .select(getSingleGuestNote(title))
          .subscribe(fn)
          .unsubscribe();
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
