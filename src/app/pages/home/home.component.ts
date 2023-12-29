import { Component } from '@angular/core';
import { InputDataComponent } from '../../components/input-data/input-data.component';
import { DataTableComponent } from '../../components/data-table/data-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputDataComponent, DataTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
