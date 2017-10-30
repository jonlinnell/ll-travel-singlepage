import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import IconWeb from 'material-ui/svg-icons/social/public';

const infoBoxStyles = {
  padding: '1rem',
  backgroundColor: '#B70062',
  color: 'white'
}

const copyStyle = {
  color: 'white',
  fontSize: '0.9rem'
}

const creditStyle = {
  color: 'white',
  fontSize: '0.6rem'
}

const urlStyle = {
  color: 'white',
  fontFamily: 'DIN Round Web',
  fontSize: '1.8rem',
  lineHeight: '1em',
  marginLeft: '12px'
}

const iconProps = {
  color: 'white'
}

export default class InfoBox extends Component {
  render() {
    return (
      <Paper className='hoc' style={ infoBoxStyles }>
        <p style={ copyStyle }>Did you know you can access this information on any device (phone, laptop, tablet) using your web browser?</p>
        <p style={ copyStyle }>You can also search bus departures for all London bus stops, and service information for all National Rail train stations nationwide.</p>
        <div className='d-flex align-items-start justify-content-center'>
          <IconWeb {...iconProps} />
          <p style={ urlStyle }>lboro.london/travel</p>
        </div>
        <p style={ creditStyle }>Tube, bus, and National Rail status data are provided by TfL and TfL Open Data. National Rail departure information is provided by National Rail.</p>
        <p style={ creditStyle } className='mb-0'>Designed and built by Jon Linnell for Loughborough University London.</p>
      </Paper>
    );
  }
}
