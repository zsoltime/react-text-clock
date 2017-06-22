const themes = [
  'black',
  'purple',
  'magenta',
  'red',
  'blue',
];

const renderOneToTwelve = (current) => {
  const digits = {
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

  return Object.keys(digits)
    .map(key => (
      <span
        key={key}
        className={+key === current ? 'active' : ''}
      >{digits[key]}</span>
    ));
};

const renderOhToSixty = (current) => {
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

  const renderFirstDigits = Object.keys(firstDigits)
    .map(key => (
      <span
        key={key}
        className={+key === (Math.floor(current / 10) * 10) ? 'active' : ''}
      >{firstDigits[key]}</span>
    ));

  const renderLastDigits = Object.keys(lastDigits)
    .map(key => {
      const lastDigit = current > 19 ? current % 10 : current;
      return (
        <span
          key={key}
          className={+key === lastDigit ? 'active' : ''}
        >{lastDigits[key]}</span>
      );
    });

  return [...renderFirstDigits, ...renderLastDigits];
};

const Settings = (props) => {
  const panelClasses = props.isOpen
    ? 'settings-panel settings-panel--is-open'
    : 'settings-panel';

  const options = themes.map(theme => {
    const themeClasses = [
      'settings-panel__option',
      `settings-panel__option--${theme}`,
      props.activeTheme === theme ? 'settings-panel__option--active' : null,
    ];

    return (
      <button
        className={themeClasses.join(' ')}
        onClick={() => props.onClickEvent(theme)}
        aria-label={theme}
      />
    );
  });

  return (
    <div className={panelClasses}>
      {options}
    </div>
  );
};

const Clock = ({ hour, minute, second }) => (
  <div className="clock">
    <div className="clock__hour">
      {renderOneToTwelve(hour)}
    </div>
    <div className="clock__minute">
      {renderOhToSixty(minute)}
    </div>
    <div className="clock__second">
      {renderOhToSixty(second)}
    </div>
  </div>
);

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
      theme: 'blue',
      isModalOpen: false,
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.tick();
    this.intervalId = setInterval(this.tick, 1000);
  }
  componentDidUpdate() {
    document.body.className = `theme-${this.state.theme}`;
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  toggleSettings() {
    this.setState(state => ({
      isModalOpen: !state.isModalOpen,
    }));
  }
  setTheme(theme) {
    this.setState({ theme });
  }
  tick() {
    const date = new Date();

    this.setState({
      hour: date.getHours() === 12 ? 12 : date.getHours() % 12,
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
        <Settings
          isOpen={this.state.isModalOpen}
          activeTheme={this.state.theme}
          onClickEvent={this.setTheme}
        />
        <button
          className="settings"
          onClick={this.toggleSettings}
          aria-label="Settings"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
