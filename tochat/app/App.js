require("babel-polyfill");

import React from 'react';
import RactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Client from './Client';

RactDOM.render(
    <BrowserRouter>
        <Client />
    </BrowserRouter>, document.getElementById('main'));