import { Component } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  isButtonSelected: boolean = false;
  selectedButton: string = '1';
  selectButton() {
    this.isButtonSelected = true;
  }

  deselectButton() {
    this.isButtonSelected = false;
  }
}
