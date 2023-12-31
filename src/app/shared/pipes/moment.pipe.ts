import { Pipe, PipeTransform } from "@angular/core";
import moment from 'moment-timezone';

@Pipe({
    name: 'localtz',
    standalone: true
})
export class MomentPipe implements PipeTransform {

    constructor() {}

    transform(value: string) {
        const browserTimeZone = moment.tz.guess();
        const convertedMoment = moment(value).clone().tz(browserTimeZone);

        return convertedMoment.format('YYYY-MM-DD HH:mm:ss');
    }

}