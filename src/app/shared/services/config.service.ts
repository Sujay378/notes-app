import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  static config = {};

  constructor() {}

  private static setQueryParams() {
    const queryParams = new HttpParams({
      fromString: window.location.search.substring(1),
    });
    queryParams.keys().forEach((key) => {
      this.config[key] = queryParams.get(key);
    });
  }

  public static get(key: string) {
    return this.config[key];
  }

  public static set(key: string, value: any) {
    this.config[key] = value;
  }
}
