import { Component, OnInit } from '@angular/core';
import { CityPreviewService } from '../../../shared/models/city-preview.service';
import { CityPreviewData } from '../model/city-preview-data';
import { CommonModule } from '@angular/common';
import { InternalizationPipe } from "../../../shared/pipes/i18n.pipe";

@Component({
    selector: 'app-city-preview',
    standalone: true,
    templateUrl: './city-preview.component.html',
    styleUrl: './city-preview.component.scss',
    imports: [CommonModule, InternalizationPipe]
})
export class CityPreviewComponent implements OnInit {

  previewData?: CityPreviewData = undefined;

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
      }
    })
  }
  
}
