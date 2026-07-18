import { Component, debounced, inject, resource, signal } from '@angular/core';
import { CardsService } from '../core/cards.service';
import { CardItem } from './card-item';
import { CardSearchBar } from './card-search-bar';
import { CardFilter, CardFilterDropDown } from './card-filter-dropdown';
/** Minimal smoke-test view: lists cards from the gRPC backend. */
@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  imports: [CardItem, CardSearchBar, CardFilterDropDown],
  styleUrl: './cards.css',
})
export class Cards {
  private readonly cardsSvc = inject(CardsService);
  name = signal('');
  debouncedName = debounced(this.name, 300);
  filters = signal<CardFilter>({ set: '', colors: [], rarity: [], pageSize: 50 });
  onFilterApply(f: CardFilter) {
    this.filters.set(f);
  }
  readonly cardsResource = resource({
    params: () => ({ name: this.debouncedName.value(), filters: this.filters() }),
    loader: async ({ params }) => {
      const { name, filters } = params;
      return (
        await this.cardsSvc.searchCards({
          name,
          set: filters.set,
          colors: filters.colors,
          rarity: filters.rarity,
          pageSize: filters.pageSize,
        })
      ).cards;
    },
  });
}
