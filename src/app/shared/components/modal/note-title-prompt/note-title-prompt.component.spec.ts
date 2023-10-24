import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTitlePromptComponent } from './note-title-prompt.component';

describe('NoteTitlePromptComponent', () => {
  let component: NoteTitlePromptComponent;
  let fixture: ComponentFixture<NoteTitlePromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteTitlePromptComponent]
    });
    fixture = TestBed.createComponent(NoteTitlePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
