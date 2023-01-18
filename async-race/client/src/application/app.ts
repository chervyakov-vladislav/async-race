import { Header } from './core/components/header/header';
import { Main } from './core/components/main-container/main-container';

class App {
  private header: Header;

  private main: Main;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
  }

  public start() {
    console.log('start');
  }
}

export default App;
