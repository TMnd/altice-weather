import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, map, startWith } from 'rxjs';
import { OpenWeather } from '../../../shared/services/open-weather.service';
import { InternalizationPipe } from '../../../shared/pipes/i18n.pipe';
import { City, CityData } from './model/city.interface';
import { checkLanguage } from '../../../shared/helpers/language';
import { CityPreviewService } from '../city-preview/city-preview.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CityPreviewData } from '../city-preview/city-preview-data';


@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    InternalizationPipe
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent implements OnInit{
  myControl = new FormControl<string | City>('');
  options: City[] = [];
  filteredOptions: Observable<City[]> | undefined;
  searchTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 500);
  selectedCity: string = "";


  constructor(
    private openWeather: OpenWeather,
    private cityPreviewService: CityPreviewService,
    private toastService: ToastService
  ){}

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private processLocalName(city: City): City {
    const language: string = checkLanguage(navigator.language);

    if(city.local_names) {
      const localeName: string = city.local_names[language];
      if(localeName) {
        city.name = localeName;
      }
    }

    return city;
  }

  private searchCallBack = (insertedValue: string) => {
    if(!insertedValue || insertedValue.length == 0) {
      this.toastService.showToast("form.no.input.detected", "warning");
    } else {
      this.openWeather.getCityList(
        insertedValue,
        (cities: City[])=>{
          this.options = [];
          cities.forEach((city: City) => {
            let shouldPush = !this.options.some(
              obj => obj.name === city.name && 
              obj.country === city.country && 
              obj.state === city.state
            );
            
            if(shouldPush){
              city = this.processLocalName(city);
              this.selectedCity = city.name;

              this.options.push(city);
              this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => {
                  const name = typeof value === 'string' ? value : value?.name;
                  return name ? this._filter(name as string) : this.options.slice();
                }),
              );
            }
          });
        });
    }
  }

  private processCityData = (data: CityData) => {
    
    const cityPreview = new CityPreviewData(
      this.selectedCity,
      data.main.temp,
      data.weather[0].main,
      data.main.humidity,
      data.main.pressure,
      (data.main.sea_level) ? data.main.sea_level : ""
    );

    this.cityPreviewService.addCityPreview(cityPreview);
  }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe((newValue) => {
      if (newValue instanceof Object) {
        this.openWeather.getCityData(newValue.lat, newValue.lon, this.processCityData);
      }
    });
  }

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  //It trigger the function after 1s of no interation
  delayedSearch = (event: Event) => {
      if(this.searchTimeout){
          clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchCallBack((event.target as HTMLInputElement).value);
      }, 1000);
  }

  //Force search using the enter key
  instantSearch = (event: KeyboardEvent) => {
    if(event.key === 'Enter'){
        if(this.searchTimeout){
            clearTimeout(this.searchTimeout);
        }
        this.searchCallBack((event.target as HTMLInputElement).value);
    }
  }

}
