import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent {
  @Input() resource: any;
  selectedStars: number = 0;

  constructor(private router: Router) {}

  toggleStar(index: number): void {
    this.selectedStars = index + 1;
  }

  goToDetails(code: number): void {
    this.router.navigate(['/resource-details', code]);
  }
}