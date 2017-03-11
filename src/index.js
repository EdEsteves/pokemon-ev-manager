import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import Home from './Home/Home';
import About from './About/About';
import App from './App/App';

import './index.scss';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Home} />
        <Match exactly pattern="/about" component={About} />
        <Match pattern="/app/:userId" component={App} />
        {/*<Miss component={NotFound} />*/}
      </div>
    </BrowserRouter>
  )
}

console.log(Root);

render(
  <Root/>,
  document.getElementById('root')
);
