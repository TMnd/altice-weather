import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputDataComponent } from './components/input-data/input-data.component';
import { ConfigService } from './services/configurations.service';
import { I18nService } from './services/i18n.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, InputDataComponent]
})
export class AppComponent {
  title = 'alticelabs-weather';

  constructor(
    private configService: ConfigService,
    private i18nService: I18nService
  ) {
    this.i18nService.toString();
  }

 
}

