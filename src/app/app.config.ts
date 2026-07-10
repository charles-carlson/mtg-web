import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideConnect } from './core/connect';

// gRPC-Web endpoint. In dev, '/api' is proxied to the backend (see proxy.conf.json)
// to sidestep CORS; in prod set this to your Envoy / gRPC-Web gateway URL.
const GRPC_WEB_BASE_URL = '/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideConnect(GRPC_WEB_BASE_URL)
  ]
};
