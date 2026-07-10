import { InjectionToken, Provider, inject } from '@angular/core';
import { Client, Transport, createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { DescService } from '@bufbuild/protobuf';

/**
 * DI token holding the single Connect transport for the app.
 * The backend (connect-go) serves the Connect protocol natively, so the browser
 * talks to it directly — no Envoy/proxy needed. Point `baseUrl` at the server
 * (in dev, '/api' is proxied to it; see proxy.conf.json).
 */
export const CONNECT_TRANSPORT = new InjectionToken<Transport>('CONNECT_TRANSPORT');

/** Register in app.config.ts: providers: [provideConnect('https://api.example.com')]. */
export function provideConnect(baseUrl: string): Provider {
  return {
    provide: CONNECT_TRANSPORT,
    useFactory: (): Transport => createConnectTransport({ baseUrl }),
  };
}

/**
 * Create a typed client for a generated service, using the app transport.
 * Call inside an injection context (field initializer, constructor, factory):
 *
 *   private readonly cards = injectClient(CardService);
 *   const res = await this.cards.search({ query: 'bolt' });
 */
export function injectClient<T extends DescService>(service: T): Client<T> {
  return createClient(service, inject(CONNECT_TRANSPORT));
}
