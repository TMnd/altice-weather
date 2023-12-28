import { Component } from '@angular/core';
import { CitySearchComponent } from './city-search/city-search.component';
import { StrengthSliderComponent } from './strength-slider/strength-slider.component';
import { InternalizationPipe } from '../../shared/pipes/i18n.pipe';

@Component({
    selector: 'app-input-data',
    standalone: true,
    templateUrl: './input-data.component.html',
    styleUrl: './input-data.component.scss',
    imports: [CitySearchComponent, StrengthSliderComponent, InternalizationPipe]
})
export class InputDataComponent {

}
