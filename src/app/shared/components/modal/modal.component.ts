import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { ModalParams } from '../../models/prompt.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  params!: ModalParams;
  showModal: boolean = false;
  modalType: string = '';

  constructor(private _alertService: AlertService) {}

  ngOnInit(): void {
    this._alertService.openModal.subscribe((config) => {
      this.modalType = config.type;
      this.params = config.params;
      this.showModal = true;
    });

    this._alertService.closeModal.subscribe(() => {
      this.modalType = '';
      this.showModal = false;
    });
  }

  close() {
    this._alertService.closeModal.emit();
  }
}
