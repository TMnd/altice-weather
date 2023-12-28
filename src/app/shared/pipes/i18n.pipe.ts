import { Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "../services/i18n.service";

@Pipe({
    name: 'translate',
    standalone: true
})
export class InternalizationPipe implements PipeTransform {

    constructor(
        private i18nService: I18nService
    ) {}

    transform(value: string): string {
        const translatedValue = this.i18nService.getValue(value);
        return translatedValue;
    }
}