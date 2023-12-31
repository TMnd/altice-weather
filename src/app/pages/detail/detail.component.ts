import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  constructor(
    private router: Router
  ){}

  return(): void{
    this.router.navigate(['/']).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err)
    });
  }
}
