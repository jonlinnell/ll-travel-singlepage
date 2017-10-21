/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PageHome from './Home';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#B70062'
  }
});

export default class App extends Component {
  constructor() {
    super();
    this.state = { selectedIndex: 0 };
    this.select = this.select.bind(this);
  }

  select = index => this.setState({ selectedIndex: index });

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <PageHome />
      </MuiThemeProvider>
    );
  }
}
