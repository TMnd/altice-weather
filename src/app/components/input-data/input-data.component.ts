import { Component, OnInit } from '@angular/core';
import { CitySearchComponent } from './city-search/city-search.component';
import { InternalizationPipe } from '../../shared/pipes/i18n.pipe';
import { CityPreviewComponent } from './city-preview/city-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { CityPreviewService } from '../../shared/models/city-preview.service';
import { StrengthSliderComponent } from './strength-slider/strength-slider.component';

@Component({
    selector: 'app-input-data',
    standalone: true,
    templateUrl: './input-data.component.html',
    styleUrl: './input-data.component.scss',
    imports: [
        CitySearchComponent, 
        StrengthSliderComponent, 
        CityPreviewComponent, 
        InternalizationPipe,
        MatButtonModule
    ]
})
export class InputDataComponent implements OnInit{

    isDisabled: boolean = true;

    constructor(
        private cityPreviewService: CityPreviewService
    ){}

    ngOnInit(): void {
        this.cityPreviewService.haveNewData.subscribe(() => {
            this.isDisabled = !(this.cityPreviewService.checkHavePreviewData())
        })
    }

    resetForm(): void {
        this.cityPreviewService.removePreviewData();
    }

    submitForm(): void {
        console.log(this.cityPreviewService.getCityPreview());
        
    }

}
