import moment from 'moment-timezone';

export function localTZ(value: string) {
    const browserTimeZone = moment.tz.guess();
    const convertedMoment = moment(value).clone().tz(browserTimeZone);
    console.log(convertedMoment);
    return convertedMoment.format('YYYY-MM-DD HH:mm:ss');
}