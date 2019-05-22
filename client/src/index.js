import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../assets/sass/main.scss';
import ReduxLoader from './components/hoc/ReduxLoader';
import AppRouter from './components/AppRoutes';
import store from './store';

import { render } from 'react-dom';

render(
    <Provider store={store}>
        <ReduxLoader>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ReduxLoader>
    </Provider>
, document.getElementById('root'));