import { Injectable } from '@angular/core';
import type { MessageInitShape } from '@bufbuild/protobuf';
import { injectClient } from './connect';
import {
  MTGRPC,
  GetCardRequestSchema,
  SearchCardsRequestSchema,
  ListCardsRequestSchema,
  ListSetsRequestSchema,
} from '../gen/cards_pb';

/**
 * Typed wrapper around the MTGRPC gRPC service.
 * Each method returns a promise of the response message. All calls go through
 * the app's gRPC-Web transport (see core/connect.ts + app.config.ts).
 */
@Injectable({ providedIn: 'root' })
export class CardsService {
  private readonly client = injectClient(MTGRPC);

  getCard(req: MessageInitShape<typeof GetCardRequestSchema>) {
    return this.client.getCard(req);
  }

  searchCards(req: MessageInitShape<typeof SearchCardsRequestSchema>) {
    return this.client.searchCards(req);
  }

  listCards(req: MessageInitShape<typeof ListCardsRequestSchema> = {}) {
    return this.client.listCards(req);
  }

  listSets(req: MessageInitShape<typeof ListSetsRequestSchema> = {}) {
    return this.client.listSets(req);
  }
}
