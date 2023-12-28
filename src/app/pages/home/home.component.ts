import { Component } from '@angular/core';
import { InputDataComponent } from '../../components/input-data/input-data.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputDataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
