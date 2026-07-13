import { Component, model } from '@angular/core';
@Component({
  selector: 'app-card-search-bar',
  templateUrl: './card-search-bar.html',
  styleUrl: './card-search-bar.css',
})
export class CardSearchBar {
  readonly value = model<string>('');
}
