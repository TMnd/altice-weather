import { Component, OnInit } from '@angular/core';
import { CityPreviewService } from './city-preview.service';
import { CityPreviewData } from './city-preview-data';
import { CommonModule } from '@angular/common';
import { InternalizationPipe } from "../../../shared/pipes/i18n.pipe";
import { WeatherTypes } from '../../../shared/enum/weather.enum';
import { getEnumKeyByValue } from '../../../shared/helpers/enum-manager';

@Component({
    selector: 'app-city-preview',
    standalone: true,
    templateUrl: './city-preview.component.html',
    styleUrl: './city-preview.component.scss',
    imports: [CommonModule, InternalizationPipe]
})
export class CityPreviewComponent implements OnInit {

  previewData?: CityPreviewData = undefined;
  weatherIcon: string = "";

  private KELVIN_FACTOR: number = 273.15;

  constructor(
    private cityPreviewService: CityPreviewService
  ){}

  private convertTempToCelcius(previewData: CityPreviewData) {
    const tempKelvin = previewData.temperature;
    return parseInt((tempKelvin - this.KELVIN_FACTOR).toFixed(1));
  }

  ngOnInit(): void {
    this.cityPreviewService.haveNewData.subscribe(() => {
      this.previewData = this.cityPreviewService.getCityPreview();
      if(this.previewData) {
        this.previewData.temperature = this.convertTempToCelcius(this.previewData);
        
        const weather = this.previewData.weather;
        this.weatherIcon = getEnumKeyByValue(WeatherTypes, weather);
      }
    })
  }
  
}
