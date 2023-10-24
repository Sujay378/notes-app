import { ResolveFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalParams } from '../models/prompt.model';
import { inject } from '@angular/core';
import { AlertService } from '../services/alert.service';

export const createNoteResolver: ResolveFn<Observable<string>> = (
  route,
  state
) => {
  const alertService = inject(AlertService);
  const router = inject(Router);

  return new Observable<string>((observer) => {
    const modalParams = new ModalParams({
      backDropEnabled: true,
      showPrimaryButton: true,
      showCloseIcon: true,
      showSecondaryButton: true,
      headerText: 'Title',
      primaryButtonText: 'Create',
      secondaryButtonText: 'Cancel',
      primaryCallback: (value) => {
        observer.next(value);
      },
      secondaryCallbck: (value) => {
        router.navigate(['/dashboard/main'], {
          skipLocationChange: true,
          queryParamsHandling: 'preserve',
        });
      },
    });

    alertService.openModal.emit({ type: 'note-title', params: modalParams });
  });
};
