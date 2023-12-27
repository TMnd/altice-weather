import { Component } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-strength-slider',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './strength-slider.component.html',
  styleUrl: './strength-slider.component.scss'
})
export class StrengthSliderComponent {

}
