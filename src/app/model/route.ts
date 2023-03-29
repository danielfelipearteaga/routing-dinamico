export interface RoutingResponse {
  response: Response;
}

export interface Response {
  DataSource: Route[];
}

export class Route {
  constructor(
    public path: string,
    public rootcomponent: string,
    public component: string
  ) {}
}


