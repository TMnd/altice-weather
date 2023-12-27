import { Component } from '@angular/core';
import { CitySearchComponent } from './city-search/city-search.component';
import { StrengthSliderComponent } from './strength-slider/strength-slider.component';
import { AppModule } from "../../app.module";

@Component({
    selector: 'app-input-data',
    standalone: true,
    templateUrl: './input-data.component.html',
    styleUrl: './input-data.component.scss',
    imports: [CitySearchComponent, StrengthSliderComponent, AppModule]
})
export class InputDataComponent {

}
