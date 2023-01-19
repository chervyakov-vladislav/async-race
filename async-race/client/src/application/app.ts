import { Header } from './core/components/header/header';
import { Main } from './core/components/main-container/main-container';
import { Router } from './shared/services/router/router';
import { routes } from './shared/services/router/routes';

class App {
  private header: Header;

  private main: Main;

  private router: Router;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);

    this.router = new Router(routes, this.main.container, [this.header.garageButton, this.header.winnersButton]);
  }

  public start() {
    console.log('start');
  }
}

export default App;
