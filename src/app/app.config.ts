import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppInitService } from './shared/services/app-init.service';
import { provideEcharts } from 'ngx-echarts';

export function initializeApp(appInitService: AppInitService): Function {
  console.log(`Language loaded => ${navigator.language}`);
  return () => appInitService.fetchi18nData();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AppInitService],
    },
    provideEcharts()
  ]
};
