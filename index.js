const renderSixty = (current) => {
  const firstDigits = {
    0: 'oh',
    20: 'twenty',
    30: 'thirty',
    40: 'fourty',
    50: 'fifty',
  };

  const lastDigits = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelwe',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
  };

  const renderFirstDigits = Object.keys(firstDigits).map(n => (
    <span
      key={n}
      className={(n * 1) === (Math.floor(current / 10) * 10) ? 'active' : ''}
    >{firstDigits[n]}</span>
  ));

  const renderLastDigits = Object.keys(lastDigits).map(n => {
    const lastDigit = current > 19 ? current % 10 : current;
    return (
      <span
        key={n}
        className={(n * 1) === lastDigit ? 'active' : ''}
      >{lastDigits[n]}</span>
    );
  });

  return [...renderFirstDigits, ...renderLastDigits];
};

const Clock = ({ hour, minute, second }) => {
  const hours = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelwe',
  };
  const renderHours = Object.keys(hours).map(n => (
    <span key={n} className={(n * 1) === hour ? 'active' : ''}>{hours[n]}</span>
  ));
  return (
    <div className="clock">
      <div className="clock__hour">
        {renderHours}
      </div>
      <div className="clock__minute">
        {renderSixty(minute)}
      </div>
      <div className="clock__second">
        {renderSixty(second)}
      </div>
    </div>
  );
};

Clock.propTypes = {
  hour: React.PropTypes.number.isRequired,
  minute: React.PropTypes.number.isRequired,
  second: React.PropTypes.number.isRequired,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: 0,
      minute: 0,
      second: 0,
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  tick() {
    const date = new Date();

    this.setState({
      hour: date.getHours() % 12,
      minute: date.getMinutes(),
      second: date.getSeconds(),
    });
  }
  render() {
    return (
      <div className="app">
        <Clock
          hour={this.state.hour}
          minute={this.state.minute}
          second={this.state.second}
         />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
