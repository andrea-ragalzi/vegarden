import { Provider } from 'react-redux';
import { store, persistor } from './store/store.ts';
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
