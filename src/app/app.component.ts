import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Route } from './model/route';
import { RoutingService } from './service/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'routing-dinamico';
  public dynamicRoutes: Route[] = [];

  constructor( private routingService: RoutingService ) {}

  ngOnInit(): void {
    this.routingService.getRouting().pipe(
      map( response => response.response.DataSource )
    )
    .subscribe( routes => this.dynamicRoutes = routes);
  }

}
