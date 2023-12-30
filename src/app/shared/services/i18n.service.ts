import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class I18nService {

    private i18n: Map<string, string> = new Map<string, string>();
    private dataLoaded = new Subject<any>();
    loadDataObservable$ = this.dataLoaded.asObservable();

    emitLoadDataSuccess() {
        this.dataLoaded.next(true);
    }

    constructor() {
    }

    setMap(data: Map<string, string>) {
        this.i18n = new Map<string, string>(data);
        this.emitLoadDataSuccess;
    }

    addMap(key: string, value: string) {
        this.i18n.set(key, value);
    }

    translate(value: string): string {
        return this.i18n.get(value) || value;
    }

}