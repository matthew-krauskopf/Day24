import { logout } from '@day24/auth-lib';
import { createReducer, on } from '@ngrx/store';
import {
  addAmiibo,
  deleteAmiibo,
  loadAmiibo,
  loadAmiibos,
  loadAmiibosFail,
  loadAmiibosSuccess,
  updateAmiibo,
} from './amiibo.actions';
import { Amiibo } from './amiibo.entity';
import {
  addAmiiboUtil,
  deleteAmiiboUtil,
  updateAmiiboUtil,
} from './amiibo.utils';

export interface AmiiboState {
  amiibos: Amiibo[];
  selectedAmiibo?: number;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
}

export const amiiboState: AmiiboState = {
  amiibos: [],
  isLoading: false,
  isSaving: false,
  isDeleting: false,
};

export const amiiboKey = 'amiibo';

export const amiiboReducer = createReducer(
  amiiboState,
  on(loadAmiibo, (state, { id }) => ({
    ...state,
    selectedAmiibo: id,
  })),
  on(loadAmiibos, (state) => ({
    ...state,
    isLoading: state.amiibos.length == 0,
  })),
  on(loadAmiibosSuccess, (state, { amiibos }) => ({
    ...state,
    isLoading: false,
    amiibos: amiibos,
  })),
  on(loadAmiibosFail, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(logout, (state) => ({
    ...state,
    amiibos: [],
  })),
  on(deleteAmiibo, (state, { id }) => ({
    ...state,
    amiibos: deleteAmiiboUtil(state.amiibos, id),
  })),
  on(updateAmiibo, (state, { name, age, species }) => ({
    ...state,
    amiibos: updateAmiiboUtil(
      state.amiibos,
      state.selectedAmiibo,
      name,
      age,
      species
    ),
  })),
  on(addAmiibo, (state) => ({
    ...state,
    amiibos: addAmiiboUtil(state.amiibos),
  }))
);
