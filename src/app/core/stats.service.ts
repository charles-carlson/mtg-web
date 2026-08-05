import { Injectable } from '@angular/core';
import type { MessageInitShape } from '@bufbuild/protobuf';
import { injectClient } from './connect';
import { MTGRPC, GetStatInfoRequestSchema } from '../gen/cards_pb';

@Injectable({ providedIn: 'root' })
export class StatService {
  private readonly client = injectClient(MTGRPC);
  getStatInfo(req: MessageInitShape<typeof GetStatInfoRequestSchema> = {}) {
    return this.client.getStatInfo(req);
  }
}
