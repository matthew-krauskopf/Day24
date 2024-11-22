import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from '../base-api.service';
import { Amiibo } from './amiibo.entity';

@Injectable({
  providedIn: 'root',
})
export class AmiiboService extends BaseAPIService {
  endpoint = '/amiibos';

  getAmiibos(): Observable<Amiibo[]> {
    return this.performGet(this.endpoint);
  }
}
