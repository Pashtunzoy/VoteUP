/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

render(
    <h1>VoteUP</h1>,
    document.getElementById('app')
);
