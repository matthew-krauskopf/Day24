import { createFeatureSelector, createSelector } from '@ngrx/store';
import { amiiboKey, AmiiboState } from './amiibo.state';
import { mapPhotos } from './amiibo.utils';

export const selectAmiiboState = createFeatureSelector<AmiiboState>(amiiboKey);

export const selectedAmiiboId = createSelector(
  selectAmiiboState,
  (amiiboState) => amiiboState.selectedAmiibo
);

export const selectAmiibos = createSelector(selectAmiiboState, (amiiboState) =>
  mapPhotos(amiiboState.amiibos.filter((p) => !p.deleted)).sort(
    (a, b) => a.id - b.id
  )
);

export const amiiboCount = createSelector(
  selectAmiiboState,
  (state) => state.amiibos.filter((p) => !p.deleted).length
);

export const selectedAmiibo = createSelector(
  selectedAmiiboId,
  selectAmiibos,
  (amiiboId, allAmiibos) => allAmiibos.find((p) => p.id == amiiboId)
);

export const isProcessing = createSelector(
  selectAmiiboState,
  (state) => state.isSaving || state.isLoading || state.isDeleting
);
