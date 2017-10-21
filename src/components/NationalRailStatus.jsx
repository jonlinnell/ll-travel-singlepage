import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Spinner from '../components/Spinner';
import NationalRailLineStatus from '../components/NationalRailLineStatus';
import api from '../utils/api';

import c2c from '../../public/img/logos/c2c.png';
import eastmidlandstrains from '../../public/img/logos/east-midlands-trains.png';
import thameslink from '../../public/img/logos/thameslink.png';
import southeastern from '../../public/img/logos/southeastern.png';
import southwesttrains from '../../public/img/logos/south-west-trains.png';
import greatnorthern from '../../public/img/logos/great-northern.png';

const logos = {
  c2c,
  'east-midlands-trains': eastmidlandstrains,
  thameslink,
  southeastern,
  'south-west-trains': southwesttrains,
  'great-northern': greatnorthern
};

class NationalRailStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      railData: [],
      error: false,
      loading: true
    };
  }
  loadData() {
    let component = this; // eslint-disable-line prefer-const
    axios.get('https://api.tfl.gov.uk/line/mode/national-rail/status', {
      params: {
        app_id: api.tfl.app_id,
        app_key: api.tfl.app_key
      }
    })
      .then((response) => {
        component.setState({
          railData: response.data,
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
    }, 240000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() { // eslint-disable-next-line arrow-body-style
    const relevantLines = _.filter(this.state.railData, (line) => {
      return (line.id === 'c2c' || line.id === 'east-midlands-trains' || line.id === 'thameslink' || line.id === 'southeastern' || line.id === 'south-west-trains' || line.id === 'great-northern');
    });

    const lines = relevantLines.map((line, i) =>
      <NationalRailLineStatus key={i} line={line} logo={logos[line.id]} />
    );
    return (
      <Paper className='hoc'>
        <List style={{ padding: 0 }}>
          <ListItem
            primaryText='National Rail Status'
            secondaryTextLines={2}
            secondaryText='Advisory only. See train operator websites for more information.'
            disabled={true}
          />
          {this.state.loading ? <Spinner error={this.state.error} /> : lines}
        </List>
      </Paper>
    );
  }
}

export default NationalRailStatus;
