import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CityPreviewData } from "../../components/input-data/model/city-preview-data";

@Injectable({
    providedIn: 'root',
})
export class CityPreviewService {
    haveNewData = new Subject<String>();

    cityPreview?: CityPreviewData = undefined;

    addCityPreview(data: CityPreviewData): void {
        this.cityPreview = data;
        this.haveNewData.next("");
    }

    getCityPreview(): CityPreviewData | undefined{
        return this.cityPreview;
    }

    checkHavePreviewData(): boolean {
        return (this.cityPreview) ? true : false;
    }

    removePreviewData(): void {
        this.cityPreview = undefined;
        this.haveNewData.next("");
    }
}