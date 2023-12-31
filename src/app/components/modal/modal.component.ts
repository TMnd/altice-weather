import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InternalizationPipe } from "../../shared/pipes/i18n.pipe";


@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    imports: [
        CommonModule,
        MatButtonModule,
        InternalizationPipe
    ]
})
export class ModalComponent {
  @Input() title: string = "";
  @Input() context: string = "";
  @Input() body: string = "";
  @Input() submitClick: CallableFunction;
  
  showModal: boolean = false;

  toggle() {
    this.showModal = !this.showModal;
  }
}
