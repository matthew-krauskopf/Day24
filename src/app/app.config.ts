import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthStateModule } from '@day24/auth-lib';
import { AmiiboStateModule } from '@day24/amiibo-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    importProvidersFrom(
      StoreModule.forRoot(),
      AuthStateModule,
      AmiiboStateModule
    ),
    provideAnimationsAsync(),
  ],
};
