import { createAction, props } from '@ngrx/store';
import { Amiibo } from './amiibo.entity';

export const loadAmiibo = createAction(
  '[Amiibo List] Load Amiibo',
  props<{ head: string; tail: string }>()
);

export const loadAmiibos = createAction('[Background] Load Amiibos');

export const loadAmiibosSuccess = createAction(
  '[Background] Load Amiibos Successful',
  props<{ amiibos: Amiibo[] }>()
);

export const loadAmiibosFail = createAction('[Background] Load Amiibos Fail');

export const deleteAmiibo = createAction(
  '[Amiibo Detail] Delete Amiibo',
  props<{ head: string; tail: string }>()
);

export const unloadAmiibos = createAction('[Logout] Unload Amiibos');
