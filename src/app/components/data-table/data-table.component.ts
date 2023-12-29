import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { InternalizationPipe } from "../../shared/pipes/i18n.pipe";
import { DataTableRow } from './data-table-row.interface';
import { DataTableService } from './data-table.service';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
    selector: 'app-data-table',
    standalone: true,
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss',
    imports: [
      CommonModule,
      MatTableModule,
      InternalizationPipe,
      MatSortModule
    ]
})
export class DataTableComponent implements OnInit,AfterViewInit  {
  displayedColumns: string[] = ['city', 'weather', 'temp', 'humidity', 'pressure', 'sea_level', 'insert_date', 'network_strength'];
  dataSource = new MatTableDataSource<DataTableRow>();

  sortedData?: DataTableRow[];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dataTableService: DataTableService,
    private _liveAnnouncer: LiveAnnouncer
  ){
    this.sortedData = this.dataSource.data.slice();
  }

  ngOnInit(): void {
    this.dataTableService.haveNewData.subscribe(() => {
      console.log("Updating data table...");
      this.dataSource = this.dataTableService.getDataRows();
    });
  } 

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      console.log(sortState.direction);
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
