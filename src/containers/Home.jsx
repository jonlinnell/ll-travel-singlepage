/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import TubeStatus from '../components/TubeStatus';
import Departures from '../components/NationalRailDepartures';
import NextBus from '../components/NextBus';

export default class Homepage extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 col-lg-3 offset-lg-1'>
            <TubeStatus />
          </div>
          <div className='col-md-4'>
            <Departures
              title='Trains departing from Stratford Intl.'
              subtitle='To London St. Pancras'
              station='SFA'
              destination='STP'
            />
            <Departures
              title='Trains from London St. Pancras'
              subtitle='Trains calling at Loughborough'
              station='STP'
              destination='LBO'
            />
          </div>
          <div className='col-md-3 col-lg-3 col-xl-3'>
            <NextBus
              title='HereEast'
              stopCode='91431,91432'
            />
            <Departures
              title='Overground trains from Hackney Wick'
              station='HKW'
              limit='10'
            />
          </div>
        </div>
      </div>
    );
  }
}
