import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from '../base-api.service';
import { Amiibo } from './amiibo.entity';

@Injectable({
  providedIn: 'root',
})
export class AmiiboService extends BaseAPIService {
  amiiboEndpoint = '/amiibo';
  typeEndpoint = '/type';
  gameseriesEndpoint = '/gameseries';
  amiiboseriesEndpoint = '/amiiboseries';
  characterEndpoint = '/character';

  getAmiibos(): Observable<Amiibo[]> {
    return this.performGet(this.amiiboEndpoint);
  }

  getAmiiboByName(name: string): Observable<Amiibo[]> {
    return this.performGet(this.amiiboEndpoint, { key: 'name', value: name });
  }

  getAmiiboById(head: string, tail: string): Observable<Amiibo[]> {
    return this.performGet(this.amiiboEndpoint, {
      key: 'id',
      value: head + tail,
    });
  }

  getAmiiboByType(type: string) {
    return this.performGet(this.amiiboEndpoint, { key: 'type', value: type });
  }

  getAmiiboByGameSeries(series: string) {
    return this.performGet(this.amiiboEndpoint, {
      key: 'gameseries',
      value: series,
    });
  }

  getAmiiboByAmiiboSeries(series: string) {
    return this.performGet(this.amiiboEndpoint, {
      key: 'amiiboSeries',
      value: series,
    });
  }

  getAmiiboByCharacter(character: string) {
    return this.performGet(this.amiiboEndpoint, {
      key: 'character',
      value: character,
    });
  }

  getAmiiboTypes() {
    return this.performGet(this.typeEndpoint);
  }

  getAmiiboGameseries() {
    return this.performGet(this.amiiboseriesEndpoint);
  }

  getAmiiboCharacters() {
    return this.performGet(this.characterEndpoint);
  }
}
