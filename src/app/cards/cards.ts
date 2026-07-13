import { Component, debounced, inject, resource, signal } from '@angular/core';
import { CardsService } from '../core/cards.service';
import { CardItem } from './card-item';
import { CardSearchBar } from './card-search-bar';
/** Minimal smoke-test view: lists cards from the gRPC backend. */
@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  imports: [CardItem, CardSearchBar],
  styleUrl: './cards.css',
})
export class Cards {
  private readonly cardsSvc = inject(CardsService);
  name = signal('');
  debouncedName = debounced(this.name, 300);
  readonly cardsResource = resource({
    params: async () => {
      return (await this.cardsSvc.searchCards({ name: this.debouncedName.value(), pageSize: 50 }))
        .cards;
    },
    loader: async () => {
      return await this.cardsSvc.listCards({ pageSize: 50 });
    },
  });
}
