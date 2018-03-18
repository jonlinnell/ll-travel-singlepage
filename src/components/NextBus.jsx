import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import NextBusInfo from '../components/NextBusInfo';

import headerImg from '../img/FFFFFF-1.png';

const errorText = 'Unable to load bus information. Did you enter the code correctly?';

export default class NextBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busData: [],
      error: false,
      loading: true,
      title: this.props.title,
      subtitle: this.props.subtitle,
      stopCode: this.props.stopCode
    };
  }

  loadData() {
    let component = this; // eslint-disable-line prefer-const
    axios.post(`${process.env.COUNTDOWN_API_PROXY}/${this.state.stopCode}`, {
      options: {
        ReturnList: 'EstimatedTime,LineID,DestinationName,StopPointName'
      }
    })
    .then((response) => {
      component.setState({
        busData: response.data,
        loading: false
      }, () => {
        if (this.state.busData[0]) {
          this.setState({ adHocTitle: this.state.busData[1][1] });
        }

        const temp = [];
        _.sortBy(this.state.busData, i => i[4]).map((bus, i) =>
          temp.push(<NextBusInfo bus={bus} key={i} />)
        );
        this.setState({ buses: temp });
      });
    })
    .catch(() => {
      this.setState({ error: true, loading: true });
    });
  }

  componentDidMount() {
    this.loadData();
    this.timer = setInterval(() => {
      this.loadData();
    }, 40000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    // Something strange is happening here. Fix it.
    this.setState({
      title: nextProps.title || this.state.title,
      subtitle: nextProps.subtitle || this.state.subtitle,
      stopCode: nextProps.stopCode || this.state.stopCode
    }, () => {
      this.loadData();
    });
  }

  render() {
    return (
      <Paper className='hoc'>
        <List style={{ padding: 0 }}>
          <Header
            title={this.state.title || this.state.adHocTitle || 'Buses'}
            subtitle={this.state.subtitle || 'Next buses calling at this stop'}
            bg={headerImg}
          />
          {this.state.loading ?
            <Spinner error={this.state.error} errorText={errorText} />
            :
            this.state.buses
          }
        </List>
      </Paper>
    );
  }
}
