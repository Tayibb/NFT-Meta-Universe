import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './service/reducers/index';
const store = createStore(rootReducer);
// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
