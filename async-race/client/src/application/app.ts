import { Header } from './core/components/header/header';
import { Main } from './core/components/main-container/main-container';
import { Router } from './shared/services/router/router';
import { routes } from './shared/services/router/routes';
import { state } from './shared/services/state';

class App {
  private header: Header;

  private main: Main;

  private router: Router | null;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);

    this.router = null;
  }

  public async start() {
    await state.updateState();
    this.router = new Router(routes, this.main.container, [this.header.garageButton, this.header.winnersButton]);
    // тут повесить листенеры
  }
}

export default App;
