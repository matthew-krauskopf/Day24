import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { AuthService } from './auth.service';
import { authKey, authReducer } from './auth.state';

@NgModule({
  imports: [
    StoreModule.forFeature(authKey, authReducer),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [AuthFacade, AuthService],
})
export class AuthStateModule {}
