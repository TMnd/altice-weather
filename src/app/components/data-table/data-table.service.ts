import { Injectable } from "@angular/core";
import { DataTableRow } from "./data-table-row.interface";
import { Subject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

@Injectable({
    providedIn: 'root',
})
export class DataTableService {
    haveNewData = new Subject<String>();
    rows: MatTableDataSource<DataTableRow> = new MatTableDataSource<DataTableRow>();

    getDataRows(): MatTableDataSource<DataTableRow> {
        return this.rows;
    }

    addRow(row: DataTableRow): void {
        const refData = this.rows.data;
        refData.push(row);
        this.rows.data = refData;
        this.haveNewData.next("");
    }

    loadRows(savedRows: DataTableRow[]): void {
        this.rows.data = savedRows;
        this.haveNewData.next("");
    }
}