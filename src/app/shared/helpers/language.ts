export function checkLanguage(language: string): string {
    return language === 'pt' || language === 'en' ? language : 'en';
  }