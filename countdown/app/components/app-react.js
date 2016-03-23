import React from 'react';
import CountDown from './countdown-react';
import MathChallenge from './math-challenge-react';
import MathResult from './math-result-react';
import { TimeTravel } from 'bdux-timetravel';

var App = React.createClass({

  render: function() {
    return (
      <div>
        <CountDown />
        <MathChallenge />
        <MathResult />
        <TimeTravel />
      </div>
    );
  }
});

export default App;
