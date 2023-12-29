import { Component, EventEmitter, Output } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { InternalizationPipe } from '../../../shared/pipes/i18n.pipe';

@Component({
  selector: 'app-strength-slider',
  standalone: true,
  imports: [MatSliderModule, InternalizationPipe],
  templateUrl: './strength-slider.component.html',
  styleUrl: './strength-slider.component.scss'
})
export class StrengthSliderComponent {
  @Output() networkStrength = new EventEmitter<string>();

  changeValue(event: Event) {
    const valueSelected = (event.target as HTMLInputElement).value;
    this.networkStrength.emit(valueSelected);
  }
}
