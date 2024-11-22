import { logout } from '@day24/auth-lib';
import { createReducer, on } from '@ngrx/store';
import {
  deleteAmiibo,
  loadAmiibo,
  loadAmiibos,
  loadAmiibosFail,
  loadAmiibosSuccess,
} from './amiibo.actions';
import { Amiibo } from './amiibo.entity';
import { deleteAmiiboUtil } from './amiibo.utils';

export interface AmiiboState {
  amiibos: Amiibo[];
  selectedAmiibo?: string;
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
  on(loadAmiibo, (state, { head, tail }) => ({
    ...state,
    selectedAmiibo: head + tail,
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
  on(deleteAmiibo, (state, { head, tail }) => ({
    ...state,
    amiibos: deleteAmiiboUtil(state.amiibos, head, tail),
  }))
);
