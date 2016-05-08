import React from 'react';
import ReactDOM from 'react-dom';
import Headings from './components/headings';
import Paragraphs from './components/paragraphs';
import Inbox from './components/inbox';

const App = () => {
  return (
    <div>
    <div id="left">
    <Inbox />
    </div>
    <div id="right">
    <Headings />
    <Paragraphs />
    </div>
    </div>
    );
}

ReactDOM.render(<App />, document.querySelector('.container'));