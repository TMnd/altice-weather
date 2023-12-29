import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InternalizationPipe } from "../../shared/pipes/i18n.pipe";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [MatButtonModule, InternalizationPipe]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
