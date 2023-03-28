import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../model/route';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  public routing!: Route[];
  constructor(private http: HttpClient) {}

  public getRouting(): Observable<any> {
    let endpointUrl = `./assets/json/routing.json`;
    return this.http.get<any>(endpointUrl);
  }

  public searchRouting() {
    let endpointUrl = `./assets/json/routing.json`;
    return this.http
      .get(endpointUrl)
      .toPromise()
      .then((response: any) => {
        this.routing = response.response;
      });
  }
}
