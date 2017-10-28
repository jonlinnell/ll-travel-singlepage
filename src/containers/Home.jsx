/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import TubeStatus from '../components/TubeStatus';
import Departures from '../components/NationalRailDepartures';
import NextBus from '../components/NextBus';
import InfoBox from '../components/InfoBox';
import PageHeader from '../components/PageHeader';

export default class Homepage extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <PageHeader />
        </div>
        <div className='row'>
          <div className='col-md-5 col-lg-3'>
            <TubeStatus />
          </div>
          <div className='col-md-3'>
            <Departures
              title='Stratford International'
              subtitle='Trains to London St. Pancras'
              station='SFA'
              destination='STP'
            />
            <Departures
              title='London St. Pancras'
              subtitle='Trains calling at Loughborough'
              station='STP'
              destination='LBO'
            />
          </div>
          <div className='col-md-3'>
            <Departures
              title='Hackney Wick'
              subtitle='London Overground services'
              station='HKW'
              limit='10'
            />
          </div>
          <div className='col-md-3 col-lg-3 col-xl-3'>
            <NextBus
              title='HereEast'
              stopCode='91431,91432'
            />
          <InfoBox />
          </div>
        </div>
      </div>
    );
  }
}
