import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, LOCALE_ID } from "@angular/core";
import { Observable, catchError, finalize, map, tap } from "rxjs";
import { I18nService } from "./i18n.service";

@Injectable({
    providedIn: 'root',
})
export class ConfigService {

    constructor(
        private i18nService: I18nService,
        private http: HttpClient,
        @Inject(LOCALE_ID) private locale: string
    ) {
        console.log('Browser Locale:', this.locale);
    }

    fetchi18nData(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.get(`assets/i18n/messages-${this.locale}.json`)
              .subscribe(
                (data: any) => {
                    console.log(data);
                  Object.keys(data).forEach(key => {
                    this.i18nService.addMap(key, data[key]);
                  });
        
                  resolve(true);
                },
                error => {
                  console.error('Error fetching i18n data:', error);
                  reject(error);
                }
              );
          });
    }
}