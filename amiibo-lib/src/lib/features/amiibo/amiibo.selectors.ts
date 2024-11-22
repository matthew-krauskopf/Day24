import { createFeatureSelector, createSelector } from '@ngrx/store';
import { amiiboKey, AmiiboState } from './amiibo.state';

export const selectAmiiboState = createFeatureSelector<AmiiboState>(amiiboKey);

export const selectedAmiiboId = createSelector(
  selectAmiiboState,
  (amiiboState) => amiiboState.selectedAmiibo
);

export const selectAmiibos = createSelector(selectAmiiboState, (amiiboState) =>
  amiiboState.amiibos.filter((a) => !a.deleted)
);

export const amiiboCount = createSelector(
  selectAmiiboState,
  (state) => state.amiibos.filter((a) => !a.deleted).length
);

export const selectedAmiibo = createSelector(
  selectedAmiiboId,
  selectAmiibos,
  (amiiboId, allAmiibos) => allAmiibos.find((a) => a.head + a.tail === amiiboId)
);

export const isProcessing = createSelector(
  selectAmiiboState,
  (state) => state.isSaving || state.isLoading || state.isDeleting
);
