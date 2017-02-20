const renderSixty = (current) => {
  const firstDigits = {
    0: 'oh',
    2: 'twenty',
    3: 'thirty',
    4: 'fourty',
    5: 'fifty',
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

  // 1 - 9 => oh one
  // 10 - 20 => ten
  // 21 - 59 => twenty one

  const renderFirstDigits = Object.keys(firstDigits).map(n => {
    const firstDigit = (Math.floor(current / 10));
    return (
      <span
        key={n}
        className={(n * 1) === firstDigit ? 'active' : ''}
      >{firstDigits[n]}</span>
    );
  });

  const renderLastDigits = Object.keys(lastDigits).map(n => {
    const lastDigit = current % 10;
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
  // const seconds = [
  //   { 0: 'oh' },
  //   { 10: 'ten' },
  //   { 11: 'eleven' },
  //   { 12: 'twelve' },
  //   { 13: 'thirteen' },
  //   { 14: 'fourteen' },
  //   { 15: 'fifteen' },
  //   { 16: 'sixteen' },
  //   { 17: 'seventeen' },
  //   { 18: 'eighteen' },
  //   { 19: 'nineteen' },
  //   { 20: 'twenty' },
  //   { 30: 'thirty' },
  //   { 40: 'fourty' },
  //   { 50: 'fifty' },
  //   { 1: 'one' },
  //   { 2: 'two' },
  //   { 3: 'three' },
  //   { 4: 'four' },
  //   { 5: 'five' },
  //   { 6: 'six' },
  //   { 7: 'seven' },
  //   { 8: 'eight' },
  //   { 9: 'nine' },
  // ];
  // const renderSeconds = seconds.map(secondObject => {
  //   let className = '';
  //   const sec = Object.keys(secondObject)[0] * 1;
  //   const firstDigit = (Math.floor(second / 10));
  //   const secondDigit = second % 10;
  //
  //   console.log('first digit', firstDigit, 'last digit', secondDigit, sec);
  //
  //   if (firstDigit === 0) {
  //     className = sec == 0 ? 'active' : '';
  //   }
  //   if (sec <= 20) {
  //     className = sec === second ? 'active' : '';
  //   } else {
  //     // check ;ast digit
  //     if (firstDigit === 2 && sec === 20) {
  //       className = 'active';
  //     }
  //     if (firstDigit === 3 && sec === 30) {
  //       className = 'active';
  //     }
  //     if (firstDigit === 4 && sec === 40) {
  //       className = 'active';
  //     }
  //     if (firstDigit === 5 && sec === 50) {
  //       className = 'active';
  //     }
  //     if (firstDigit === 6 && sec === 60) {
  //       className = 'active';
  //     }
  //     // if ((second % 10 !== 0) && second % 10 === sec) {
  //     //   className = 'active';
  //     // }
  //
  //     // first digit => tens
  //     // if (Math.floor(sec / 10) === Math.floor((second) / 10)) {
  //     //   className = 'active';
  //     // }
  //     // // second digit
  //     // if (sec % 10 === second % 10) {
  //     //   className = 'active';
  //     // }
  //   }
  //   return (
  //     <span key={sec} className={className}>
  //       {secondObject[sec]}
  //     </span>
  //   );
  // });
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
