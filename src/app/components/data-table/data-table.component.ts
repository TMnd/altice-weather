import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { InternalizationPipe } from "../../shared/pipes/i18n.pipe";
import { I18nService } from '../../shared/services/i18n.service';

export interface PeriodicElement {
  city: string;
  weather: string;
  temp: string;
  symbol: string;
  humidity: string;
  pressure: string;
  sea_level: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
    selector: 'app-data-table',
    standalone: true,
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss',
    imports: [MatTableModule, InternalizationPipe]
})
export class DataTableComponent {
  displayedColumns: string[] = ['city', 'weather', 'temp', 'humidity', 'pressure', 'sea_level'];
  dataSource = ELEMENT_DATA;

  constructor(
    private i18nService: I18nService
  ){}
}
