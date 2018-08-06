import { Dispatch } from "redux";
import { default as Route } from "route-parser";

export type RouteParams = {
  [i: string]: string
}

export interface RouteAction<S> {
  (dispatch: Dispatch<S>, params: RouteParams): Promise<any>;
}

export interface RouteDefinition<S> {
  name: string
  action: RouteAction<S>
}

export type Routes<S> = {
  [uriPattern: string]: RouteDefinition<S>
}

class RouteMatcher<S> {
  public route: Route;
  public name: string;
  public action: RouteAction<S>;

  constructor(public uriPattern: string, definition: RouteDefinition<S>) {
    this.route = new Route(uriPattern);
    this.name = definition.name;
    this.action = definition.action;
  }
}

export class Router<S>{
  private lastUri: string = ""
  private matchers: RouteMatcher<S>[];
  private navigating: boolean
  public dispatch: Dispatch<S> | null;

  constructor(routes: Routes<S>) {
    this.matchers = [];
    this.navigating = false;
    this.dispatch = null;
    for (const uriPattern in routes) {
      if (routes.hasOwnProperty(uriPattern)) {
        this.matchers.push(new RouteMatcher(uriPattern, routes[uriPattern]));
      }
    }
  }

  handleUri(dispatch: Dispatch<S>, uri: string): RouteParams | null {
    for (const matcher of this.matchers) {
      const match = matcher.route.match(uri);

      if (match) {
        const params = typeof match === 'boolean' ? {} : match;
        this.runAction(matcher, params);
      }
    }
    return null;
  }

  uriFor(pageName: string, params: { [name: string]: string }): string {
    for (const matcher of this.matchers) {
      if (matcher.name === pageName) {
        const uri = matcher.route.reverse(params);

        return typeof uri === 'string' ? uri : '/';
      }
    }
    return '/';
  }

  navigateTo(pageName: string, params: { [name: string]: string }) {
    for (const matcher of this.matchers) {
      if (matcher.name === pageName) {
        this.runAction(matcher, params);
        return;
      }
    }
  }

  pushHistory(pageName: string, params: { [name: string]: string }) {
    if (this.navigating) return;

    const uri = this.uriFor(pageName, params);

    if (uri === this.lastUri) {
      return;
    }

    if (this.lastUri.length === 0) {
      history.replaceState(null, "", uri)
    } else {
      history.pushState(null, "", uri);
    }

    this.lastUri = uri;
  }

  private runAction(matcher: RouteMatcher<S>, params: { [name: string]: string }) {
    if (!this.dispatch) return;

    this.navigating = true;
    matcher.action(this.dispatch, params).then(() => {
      this.navigating = false;
      this.pushHistory(matcher.name, params);
    }, () => {
      this.navigating = false;
    });
  }
}

export function bindHistory<S>(dispatch: Dispatch<S>, router: Router<S>) {
  router.dispatch = dispatch;
  window.onload = () => router.handleUri(dispatch, window.location.pathname + window.location.search);
  window.onpopstate = () => router.handleUri(dispatch, window.location.pathname + window.location.search);
}
