// import { RouterOptions } from '../models/router-options';

// export class Router {
//   public routes: any = [];

//   private mode: string | null = null;

//   private root: string = '/';

//   private current: string | null = null;

//   constructor(options: RouterOptions) {
//     this.mode = window.history.pushState.length ? 'history' : 'hash';
//     if (options.mode) this.mode = options.mode;
//     if (options.root) this.root = options.root;

//     this.listen();
//   }

//   public add(path: string, cb: any) {
//     this.routes.push({
//       path,
//       cb,
//     });
//     return this;
//   }

//   public remove(path: string) {
//     for (let i = 0; i < this.routes.length; i += 1) {
//       if (this.routes[i].path === path) {
//         this.routes.slice(i, 1);
//         return this;
//       }
//     }
//     return this;
//   }

//   public flush() {
//     this.routes = [];
//     return this;
//   }

//   public clearSlashes(path: string) {
//     return path
//       .replace(/\/$/, '')
//       .replace(/^\//, '');
//   }

//   public getFragment() {
//     let fragment = ''

//     if (this.mode === 'history') {
//       fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search))
//       fragment = fragment.replace(/\?(.*)$/, '')
//       fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment
//     } else {
//       const match = window.location.href.match(/#(.*)$/)
//       fragment = match ? match[1] : ''
//     }
//     return this.clearSlashes(fragment)
//   }

//   public navigate(path = ''){
//     if (this.mode === 'history') {
//         window.history.pushState(null, '', this.root + this.clearSlashes(path))
//     } else {
//         window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`
//     }
//     return this;
//   }

//   public listen() {
//     clearInterval(this.interval)
//     this.interval = setInterval(this.interval, 50)
// }

//   public interval() {
//     if (this.current === this.getFragment()) return
//     this.current = this.getFragment()

//     this.routes.some((route) => {
//       const match = this.current.match(route.path)

//       if (match) {
//         match.shift()
//         route.cb.apply({}, match)
//         return match
//       }
//       return false
//     })
//   }
    
// }
