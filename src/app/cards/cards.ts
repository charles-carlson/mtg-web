import { Component, inject, resource } from '@angular/core';
import { CardsService } from '../core/cards.service';
import { CardItem } from './card-item';
/** Minimal smoke-test view: lists cards from the gRPC backend. */
@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  imports: [CardItem],
  styleUrl: './cards.css',
})
export class Cards {
  private readonly cardsSvc = inject(CardsService);

  readonly cardsResource = resource({
    loader: async () => {
      const res = await this.cardsSvc.listCards({ pageSize: 50 });
      return res.cards;
    },
  });
}
