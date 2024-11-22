import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteAmiibo, loadAmiibo, loadAmiibos } from './amiibo.actions';
import {
  amiiboCount,
  isProcessing,
  selectAmiibos,
  selectedAmiibo,
} from './amiibo.selectors';
import { Amiibo } from './amiibo.entity';

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

  loadAmiibo(head: string, tail: string) {
    this.store.dispatch(loadAmiibo({ head, tail }));
  }

  loadAmiibos() {
    this.store.dispatch(loadAmiibos());
  }

  deleteAmiibo(amiibo: Amiibo) {
    this.store.dispatch(deleteAmiibo({ head: amiibo.head, tail: amiibo.tail }));
  }
}
