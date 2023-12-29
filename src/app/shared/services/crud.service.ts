import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastService } from "./toast.service";
import { DataTableRow } from "../../components/data-table/data-table-row.interface";
import { Observable, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CrudService {
    url: String = environment.crudcrudUrl;
    apiKey: String = environment.crudcrudApiKey;

    constructor(
        private http: HttpClient,
        private toastService: ToastService
    ){}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    addCity(city: DataTableRow): Observable<DataTableRow>  {
        return this.http.post<DataTableRow>(`${this.url}${this.apiKey}/city`, JSON.stringify(city), this.httpOptions);
    }
}