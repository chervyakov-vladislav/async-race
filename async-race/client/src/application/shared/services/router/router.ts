import { ButtonElement } from '../../components/base-elements/button-element';
import { RouterOptions } from '../../models/router-options';

export class Router {
  private routes: RouterOptions[];

  private container: HTMLElement;

  private nestedRoute: string;

  constructor(routes: RouterOptions[], container: HTMLElement, listeners: ButtonElement[]) {
    this.routes = routes;
    this.container = container;
    this.nestedRoute = '/';
    this.addListeners(listeners);
    this.loadInitialRoute();
  }

  public loadRoute(...urlSegments: string[]) {
    const matchedRoute = this.matchUrlToRoute(urlSegments);

    const url = this.nestedRoute + `${urlSegments.join('/')}`;
    // console.log(window.location.pathname);
    history.pushState({}, '', url);

    this.container.innerHTML = '';
    this.container.append((matchedRoute as RouterOptions).template.node);
  }

  private matchUrlToRoute(urlSegments: string[]) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
    });
    return matchedRoute;
  }

  private loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    this.nestedRoute = this.isNested();
    this.loadRoute(...pathSegments);
  }

  private addListeners(listeners: ButtonElement[]) {
    listeners.forEach((item, index) =>
      item.node.addEventListener('click', () => this.loadRoute(this.routes[index].path.slice(1)))
    );
  }

  private isNested() {
    const notNested = this.routes.some((item) => item.path === window.location.pathname);
    return window.location.pathname.length > 1 && !notNested ? window.location.pathname : '/';
  }
}
