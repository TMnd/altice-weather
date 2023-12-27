import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { InternalizationPipe } from './pipes/i18n.pipe';
import { ConfigService } from './services/configurations.service';
import { BrowserModule } from '@angular/platform-browser';

export function initConfig(appConfig: ConfigService) {
  console.log("---")
  return appConfig.fetchi18nData();
}

export function initializeApp(): Promise<any> {
  return new Promise((resolve, reject) => {
    // Do some asynchronous stuff
    console.log("---");
    resolve(true);
  });
}

@NgModule({
  declarations: [
    InternalizationPipe,
  ],
  exports: [InternalizationPipe],
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      multi: true
    },
  ],
  bootstrap: []
})
export class AppModule { }
