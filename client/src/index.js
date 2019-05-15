import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../assets/sass/main.scss';
import App from './components/App';

import { render } from 'react-dom';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('root'));