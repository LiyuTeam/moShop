import { Provider } from './provider/Provider';

namespace ZenGate {
  export default {
    app: Object.defineProperty(this, 'zen', { provider: Provider }),
  };
}
