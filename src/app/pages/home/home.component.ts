import { Component } from '@angular/core';
import { InputDataComponent } from '../../components/input-data/input-data.component';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { NotesComponent } from '../../components/notes/notes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputDataComponent, DataTableComponent, NotesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
