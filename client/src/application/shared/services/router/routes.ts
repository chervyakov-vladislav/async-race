import { GaragePage } from '../../../main/pages/garage-page/garage-page';
import { WinnersPage } from '../../../main/pages/winners-page/winners-page';

export const routes = [
  {
    path: '/',
    template: new GaragePage('garage-page'),
  },
  {
    path: '/winners',
    template: new WinnersPage('winners-page'),
  },
];
