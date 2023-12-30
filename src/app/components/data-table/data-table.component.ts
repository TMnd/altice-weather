import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { InternalizationPipe } from "../../shared/pipes/i18n.pipe";
import { DataTableRow } from './data-table-row.interface';
import { DataTableService } from './data-table.service';
import { CommonModule, I18nSelectPipe } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CrudService } from '../../shared/services/crud.service';
import { ToastService } from '../../shared/services/toast.service';
import { I18nService } from '../../shared/services/i18n.service';
import { MyCustomPaginatorIntl } from './implementation/pagination-impl';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-data-table',
    standalone: true,
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss',
    imports: [
      CommonModule,
      MatTableModule,
      InternalizationPipe,
      MatSortModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatCheckboxModule,
      MatIconModule,
      MatButtonModule,
      MatProgressSpinnerModule
    ],
    providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class DataTableComponent implements OnInit  {
  displayedColumns: string[] = ['select', 'city', 'weather', 'temp', 'humidity', 'pressure', 'sea_level', 'insert_date', 'network_strength'];
  dataSource = new MatTableDataSource<DataTableRow>();
  selection = new SelectionModel<DataTableRow>(true, []);

  sortedData?: DataTableRow[];

  paginatorLabel: string = this.i18nService.translate('data.table.label.pagination');

  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private i18nService: I18nService,
    private toastService: ToastService,
    private crudService: CrudService,
    private dataTableService: DataTableService,
    private _liveAnnouncer: LiveAnnouncer
  ){
    this.sortedData = this.dataSource.data.slice();
  }

  private processDeletion(id: string): void {
    for(let i=0; i<this.dataSource.data.length; i++) {
      let city = this.dataSource.data[i];
      if(city._id === id) {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
      }
    }    
  }

  ngOnInit(): void {
    this.dataTableService.haveNewData.subscribe(() => {
      console.log("Updating data table...");
      this.dataSource = this.dataTableService.getDataRows();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      //Santo prego nº2 ;)
      this.isLoading=true;
      //To simulate, 1s max
      setTimeout(() => {
        this.isLoading=false;
      }, 500)
    });

    this.crudService.getCities().subscribe({
      next: (value: DataTableRow[]) => this.dataTableService.loadRows(value),
      error: (e) => {
        this.toastService.showToast("form.input.error", "error");
        //To simulate, 1s max
        setTimeout(() => {
          this.isLoading=false;
        }, 500)
      },
      complete: () => {
        console.info('Get city list request...');
        //To simulate, 1s max
        setTimeout(() => {
          this.isLoading=false;
        }, 500)
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  deleteSelected(): void {
    const entitiesToDelete: DataTableRow[] = this.selection.selected;
    this.isLoading=true;
    entitiesToDelete.map(entity => {
      const id: string | undefined = entity._id;
      if(id) {
        this.crudService.removeCity(id).subscribe({
          next: (value) => {
            this.processDeletion(id);
            // Santo prego :)
            setTimeout(() => {
              this.toastService.showToast("data.deletion.sucess", "success");
              this.isLoading=false;
            }, 500);
          },
          error: (e) => this.toastService.showToast("form.input.error", "error"),
          complete: () => {
            console.info('Delete city request...');
            setTimeout(() => {
              this.isLoading=false;
            }, 500);
          }
        });
      }
    });
  }

}
