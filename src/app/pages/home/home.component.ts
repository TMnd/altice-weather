import { Component } from '@angular/core';
import { InputDataComponent } from '../../components/input-data/input-data.component';
import { CityPreviewComponent } from '../../components/input-data/city-preview/city-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputDataComponent, CityPreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
