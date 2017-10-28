import React, { Component } from 'react';
import axios from 'axios';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Header from '../components/Header';
import LineStatus from '../components/LineStatus';
import Spinner from '../components/Spinner';

import headerImg from '../img/FFFFFF-1.png';

import api from '../utils/api';

const errorText = 'Tube data not loading is very unusual, so this should be reported to Jon.';

export default class TubeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tubeData: [],
      error: false,
      loading: true
    };
  }
  loadData() {
    let component = this; // eslint-disable-line prefer-const
    axios.get('https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status', {
      params: {
        app_id: api.tfl.app_id,
        app_key: api.tfl.app_key
      }
    })
    .then((response) => {
      component.setState({
        tubeData: response.data,
        loading: false
      });
    })
    .catch(() => {
      this.setState({ error: true });
    });
  }
  componentDidMount() {
    this.loadData();
    this.timer = setInterval(() => {
      this.loadData();
    }, 120000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const lines = this.state.tubeData.map((line, i) =>
      <LineStatus key={i} line={line} />
    );
    return (
      <Paper className='hoc'>
        <List style={{ padding: 0 }}>
          <Header
            title='Tube status'
            subtitle='Visit tfl.gov.uk for more information'
            bg={headerImg}
          />
        {this.state.loading ? <Spinner error={this.state.error} errorText={errorText} /> : lines}
        </List>
      </Paper>
    );
  }
}
