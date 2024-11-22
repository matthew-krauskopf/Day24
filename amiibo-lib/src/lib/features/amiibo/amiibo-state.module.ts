import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AmiiboEffects } from './amiibo.effects';
import { AmiiboFacade } from './amiibo.facade';
import { AmiiboService } from './amiibo.service';
import { amiiboKey, amiiboReducer } from './amiibo.state';

@NgModule({
  imports: [
    StoreModule.forFeature(amiiboKey, amiiboReducer),
    EffectsModule.forFeature([AmiiboEffects]),
  ],
  providers: [AmiiboFacade, AmiiboService],
})
export class AmiiboStateModule {}
