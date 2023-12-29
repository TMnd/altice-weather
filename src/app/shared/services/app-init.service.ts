import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { I18nService } from "./i18n.service";
import { map } from "rxjs";
import { checkLanguage } from "../helpers/language";

@Injectable({
    providedIn: 'root',
})
export class AppInitService {

    constructor(
        private i18nService: I18nService,
        private httpClient: HttpClient,
    ) {}

    private objectToMap(obj: { [key: string]: string }): Map<string, string> {
      const map = new Map<string, string>();
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          map.set(key, obj[key]);
        }
      }
      return map;
    }

    fetchi18nData() {
      const language = checkLanguage(navigator.language);
      return this.httpClient.get(`assets/i18n/messages-${language}.json`).pipe(
        map((data: any) => { //Should be json datatype
          const resultMap: Map<string, string> = this.objectToMap(data);
          Object.keys(data).forEach(key => {
            this.i18nService.addMap(key, data[key]);
          });
        })
      );
    }
}