import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addAmiibo,
  deleteAmiibo,
  loadAmiibo,
  loadAmiibos,
  updateAmiibo,
} from './amiibo.actions';
import {
  amiiboCount,
  isProcessing,
  selectAmiibos,
  selectedAmiibo,
} from './amiibo.selectors';

@Injectable({
  providedIn: 'root',
})
export class AmiiboFacade {
  amiibos$;
  amiiboCount$;
  selectedAmiibo$;
  isProcessing$;

  constructor(private store: Store) {
    this.amiibos$ = this.store.select(selectAmiibos);
    this.amiiboCount$ = this.store.select(amiiboCount);
    this.selectedAmiibo$ = this.store.select(selectedAmiibo);
    this.isProcessing$ = this.store.select(isProcessing);
  }

  loadAmiibo(id: number) {
    this.store.dispatch(loadAmiibo({ id }));
  }

  loadAmiibos() {
    this.store.dispatch(loadAmiibos());
  }

  deleteAmiibo(id: number) {
    this.store.dispatch(deleteAmiibo({ id }));
  }

  updateAmiibo(name: string, age: number, species: string) {
    this.store.dispatch(updateAmiibo({ name, age, species }));
  }

  addAmiibo() {
    this.store.dispatch(addAmiibo());
  }
}
