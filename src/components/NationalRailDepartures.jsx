/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import Darwin from 'national-rail-darwin';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import TrainDepartureInfo from '../components/TrainDepartureInfo';

import headerImg from '../img/FFFFFF-1.png';

import api from '../utils/api';

const rail = new Darwin(api.darwinApiKey);

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
      exclude: props.exclude || null,
      destination: props.destination,
      limit: props.limit || 5
    };
  }

  loadData() {
    const temp = [];
    this.setState({ loading: true });

    rail.getDepartureBoardWithDetails(this.state.station, {
      rows: this.state.limit,
      destination: this.state.destination
    }, (err, response) => {
      if (err) {
        this.setState({ error: true });
      } else {
        response.trainServices.map((departure, i) => {
          if (departure.destination.crs === this.state.exclude) {
            return 1;
          } else {
            temp.push(<TrainDepartureInfo key={i} departure={departure} />);
          }
        });

        this.setState({
          loading: false,
          departures: temp,
          raw: response
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: false,
      title: nextProps.title,
      subtitle: nextProps.subtitle,
      station: nextProps.station,
      exclude: nextProps.exclude,
      destination: nextProps.destination,
      limit: nextProps.limit
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
