import { Component } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Observable, map, of, startWith } from 'rxjs';
import { City } from '../../../model/city';
import { OpenWeather } from '../../../services/open-weather.service';


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
    AsyncPipe
  ],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent {
  myControl = new FormControl<string | City>('');
  options: City[] = [];
  filteredOptions: Observable<City[]> | undefined;
  searchTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '', 500);

  constructor(
    private openWeather: OpenWeather
  ){}

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private searchCallBack = (insertedValue: string) => {
    this.openWeather.getCityData(
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
