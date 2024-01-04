import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InternalizationPipe } from "../../shared/pipes/i18n.pipe";
import { ModalComponent } from '../../components/modal/modal.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [
      FontAwesomeModule,
      MatButtonModule,
      InternalizationPipe,
      ModalComponent,
      MatIconModule
    ]
})
export class FooterComponent implements OnInit{
  gitHubIcon = faGithub;
  linkedin = faLinkedin;
  envelope = faEnvelope;
  cv = faFileDownload;
  angularVersion: string | null = "";
  
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    const domElement: HTMLBodyElement | null = document.querySelector("app-root");
    if(domElement != null) {
      this.angularVersion = domElement.getAttribute("ng-version");
    }
  }

  openLink(url: string) {
    window.open(url, "_blank")
  }
}
