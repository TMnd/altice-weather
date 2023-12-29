export function getEnumKeyByValue(enumObject: any, currentWeather: string): string {
    const enumKeys = Object.keys(enumObject);

    for (const key of enumKeys) {
        if (key === currentWeather) {
            return enumObject[key];
        }
    }

    return currentWeather;
}