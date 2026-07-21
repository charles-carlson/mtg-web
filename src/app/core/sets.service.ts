import { Injectable } from '@angular/core';
import type { MessageInitShape } from '@bufbuild/protobuf';
import { injectClient } from './connect';
import { MTGRPC, GetSetInfoRequestSchema } from '../gen/cards_pb';

@Injectable({ providedIn: 'root' })
export class SetService {
  private readonly client = injectClient(MTGRPC);
  getSetInfo(req: MessageInitShape<typeof GetSetInfoRequestSchema> = {}) {
    return this.client.getSetInfo(req);
  }
}
