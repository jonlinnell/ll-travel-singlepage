/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import axios from 'axios'
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import TrainDepartureInfo from '../components/TrainDepartureInfo';
import _ from 'lodash';

import headerImg from '../img/FFFFFF-1.png';

class Departures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureData: [],
      departures: [],
      error: false,
      loading: true,
      title: props.title,
      subtitle: props.subtitle,
      station: props.station,
      timeOffset: props.timeOffset,
      timeWindow: props.timeWindow,
      rows: props.limit || 5,
      filter: props.filter,
      destination: props.destination,
      exclude: props.exclude
    };
  }

  loadData() {
    let temp = [];
    this.setState({ loading: true });

    const options = {
      timeOffset: this.state.timeOffset,
      timeWindow: this.state.timeWindow,
      rows: this.state.limit,
      filter: this.state.filter,
      destination: this.state.destination
    };

    axios.post(`${process.env.DARWIN_API_PROXY}/getDepartureBoardWithDetails/${this.state.station}`, {
      token: process.env.DARWIN_TOKEN  
    })
      .then((response) => {
        let excludes = null;
          if (this.state.exclude) {
            excludes = this.state.exclude.split(',');
          }
          response.data.trainServices.map((departure, i) => {
            if (_.find(excludes, function(o) { return o === departure.destination.crs })) {
              return 1;
            } else {
              temp.push(<TrainDepartureInfo key={i} departure={departure} />);
            }

            this.setState({
              loading: false,
              departures: temp,
              raw: response.data
            })
        })
      })
      .catch(() => this.setState({ error: true }))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: false,
      title: nextProps.title,
      subtitle: nextProps.subtitle,
      station: nextProps.station,
      timeOffset: nextProps.timeOffset,
      timeWindow: nextProps.timeWindow,
      rows: nextProps.limit,
      filter: nextProps.filter,
      destination: nextProps.destination,
      exclude: nextProps.exclude
    }, () => {
      this.loadData();
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
    return (
      <Paper style={{ marginBottom: '1rem' }}>
        <List style={{ padding: 0 }}>
          <Header
            title={this.state.title}
            subtitle={this.state.subtitle}
            bg={headerImg}
          />
          {this.state.loading ? <Spinner error={this.state.error} /> : this.state.departures}
        </List>
      </Paper>
    );
  }
}

export default Departures;
