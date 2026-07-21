import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { Card } from '../gen/cards_pb';
@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.html',
  imports: [NgOptimizedImage],
  styleUrl: './card-item.css',
})
export class CardItem {
  readonly card = input.required<Card>();
  // when true, the image preloads eagerly (for above-the-fold / LCP images)
  readonly priority = input(false);
}
