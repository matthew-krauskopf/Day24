import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseAPIService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  baseUrl: string = 'https://json-server-vercel-ebon.vercel.app';

  protected performGet<T>(
    endpoint: string,
    ...params: { key: string; value: string }[]
  ): Observable<T[]> {
    let options = new HttpParams();
    params.forEach((p) => {
      options = options.append(p.key, p.value);
    });
    return this.http.get<T[]>(this.baseUrl + endpoint, { params: options });
  }
}
