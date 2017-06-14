import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';

import TubeStatus from './TubeStatus';
import Departures from './Departures';
import NationalRailStatus from './NationalRailStatus';
import NextBus from './NextBus';

import Footer from './Footer';

import '../public/favicon.ico';
import './index.css';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-5'>
          <TubeStatus />
        </div>
        <div className='col-lg-4'>
          <Departures
            title='Stratford Intl. Departures'
            subtitle='Trains to London St. Pancras'
            station='SFA'
            destination='STP'
          />
          <Departures
            title='London St. Pancras Departures'
            subtitle='Trains calling at Loughborough'
            station='STP'
            destination='LBO'
          />
        </div>
        <div className='col-lg-3'>
          <NextBus />
          <NationalRailStatus />
        </div>
      </div>
    </div>
  </MuiThemeProvider>,
  document.getElementById('root')
);

render(<Footer />, document.getElementById('footer'));
