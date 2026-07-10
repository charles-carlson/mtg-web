import { Component, inject, signal } from '@angular/core';
import { CardsService } from '../core/cards.service';
import type { Card } from '../gen/cards_pb';
import { CardItem } from './card-item';
/** Minimal smoke-test view: lists cards from the gRPC backend. */
@Component({
  selector: 'app-cards',
  templateUrl: './cards.html',
  imports: [CardItem],
  styleUrl: './cards.css',
})
export class Cards {
  private readonly cards$ = inject(CardsService);

  readonly cards = signal<Card[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await this.cards$.listCards({ pageSize: 50 });
      this.cards.set(res.cards);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.loading.set(false);
    }
  }
}
