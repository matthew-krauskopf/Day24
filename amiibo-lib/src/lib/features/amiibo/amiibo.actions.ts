import { createAction, props } from '@ngrx/store';
import { Amiibo } from './amiibo.entity';

export const addAmiibo = createAction('[Amiibo List] Add Amiibo');

export const loadAmiibo = createAction(
  '[Amiibo List] Load Amiibo',
  props<{ id: number }>()
);

export const loadAmiibos = createAction('[Background] Load Amiibos');

export const loadAmiibosSuccess = createAction(
  '[Background] Load Amiibos Successful',
  props<{ amiibos: Amiibo[] }>()
);

export const loadAmiibosFail = createAction('[Background] Load Amiibos Fail');

export const deleteAmiibo = createAction(
  '[Amiibo Detail] Delete Amiibo',
  props<{ id: number }>()
);

export const unloadAmiibos = createAction('[Logout] Unload Amiibos');

export const updateAmiibo = createAction(
  '[Amiibo Details] Update Amiibo',
  props<{ name: string; age: number; species: string }>()
);
