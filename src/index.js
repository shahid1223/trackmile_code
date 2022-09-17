import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { store } from './rtk-slice/store';
import Routes from './utils/routes';
// import history from './utils/history';
import { BrowserRouter } from "react-router-dom"
// import Container from 'react-bootstrap/Container';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter >
      {/* <ConnectedRouter history={history}> */}
        {/* <Container fluid> */}
          <Routes />
        {/* </Container> */}
      {/* </ConnectedRouter> */}
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
