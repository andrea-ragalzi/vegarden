import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement);
root.render(<Provider store={store}> <App /> </Provider>);




