import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { notePage, pageSection } from 'src/app/shared/types/form-types';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  @ViewChild('pageContainer', { static: false }) pageContainer!: ElementRef;
  @Input() pageForm!: notePage;
  @Output() deletePageEvent = new EventEmitter();

  step: number = 1;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get sectionArray() {
    return this.pageForm.controls.sections.controls;
  }

  setStep(num: number) {
    this.step = num;
  }

  deletePage() {
    this.deletePageEvent.emit();
  }

  addNewSection() {
    this.pageForm.controls.sections.push(this.createNewSection());
    setTimeout(() => {
      this.step += 1;
      setTimeout(() => {
        const rect = document.documentElement.getBoundingClientRect();
        document.documentElement.scrollTo(
          rect.x,
          document.documentElement.scrollHeight + 20
        );
      });
    });
  }

  createNewSection(): pageSection {
    return this.fb.group({
      header: ['', [Validators.maxLength(20)]],
      body: ['', [Validators.required]],
    });
  }

  resetSection(index: number) {
    this.pageForm.controls.sections.controls[index].reset();
  }

  deleteSection(index: number) {
    this.pageForm.controls.sections.controls.splice(index, 1);
    this.step -= 1;
  }
}
