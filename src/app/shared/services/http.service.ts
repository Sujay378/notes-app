import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs';

interface UrlConfig {
  params?: { [key: string]: string };
  queryParams?: { [key: string]: string };
  headers?: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  constructURL(service: string, route: string, config?: UrlConfig) {
    let baseUrl = `${environment.protocol}//${environment.host}/${environment.api[service][route]}`;
    config &&
      config.params &&
      (baseUrl = this.setParams(baseUrl, config.params));
    config &&
      config.queryParams &&
      (baseUrl = this.setQueryString(baseUrl, config.queryParams));
    return baseUrl;
  }

  private setQueryString(baseUrl: string, queryObj: Object) {
    return Object.keys(queryObj).reduce((acc, key, index, arr) => {
      return (
        acc + `${key}=${queryObj[key]}` + (index + 1 === arr.length ? '' : '&')
      );
    }, `${baseUrl}?`);
  }

  private setParams(baseUrl: string, paramObj: Object) {
    return Object.keys(paramObj).reduce((acc, key) => {
      return acc.replace(`[${key}]`, paramObj[key]);
    }, baseUrl);
  }

  private getGlobalHeaders() {
    return new HttpHeaders({
      Socket: ConfigService.get('roomId'),
      ...(ConfigService.get('authToken')
        ? { Authorization: ConfigService.get('authToken') }
        : {}),
      ...(ConfigService.get('encryption')
        ? { Encryption: ConfigService.get('encryption') }
        : {}),
    });
  }

  httpGet(
    service: string,
    route: string,
    config?: UrlConfig,
    fullResponse = false
  ) {
    const url = this.constructURL(service, route, config);
    const headers =
      config && config.headers
        ? Object.keys(config.headers).reduce((acc, key) => {
            return acc.append(key, config.headers![key]);
          }, this.getGlobalHeaders())
        : this.getGlobalHeaders();

    return this._http.get(url, { observe: 'response', headers }).pipe(
      map((res) => {
        if (res.headers.has('Authorization'))
          ConfigService.set('authToken', res.headers.get('Authorization'));

        if (fullResponse) return res;

        return res.body;
      })
    );
  }

  httpPost(
    service: string,
    route: string,
    payload: Object,
    config?: UrlConfig,
    fullResponse = false
  ) {
    const url = this.constructURL(service, route, config);
    const headers =
      config && config.headers
        ? Object.keys(config.headers).reduce((acc, key) => {
            return acc.append(key, config.headers![key]);
          }, this.getGlobalHeaders())
        : this.getGlobalHeaders();

    return this._http.post(url, payload, { observe: 'response', headers }).pipe(
      map((res) => {
        if (res.headers.has('Authorization'))
          ConfigService.set('authToken', res.headers.get('Authorization'));

        if (fullResponse) return res;

        return res.body;
      })
    );
  }
}
