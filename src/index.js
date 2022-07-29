// Theme Styles
import './css/app.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';

// Required Libraries
import $ from "jquery";
import 'bootstrap';

// ReactJs
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './js/App';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
