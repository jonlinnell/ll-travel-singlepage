import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import IconWeb from 'material-ui/svg-icons/social/public';

const infoBoxStyles = {
  padding: '1rem',
  backgroundColor: '#B70062',
  color: 'white'
}

const copyStyle = {
  color: 'white'
}

const urlStyle = {
  color: 'white',
  fontFamily: 'DIN Round Web',
  fontSize: '1.8rem',
  lineHeight: '1em'
}

const iconProps = {
  color: 'white'
}

export default class InfoBox extends Component {
  render() {
    return (
      <Paper className='hoc' style={ infoBoxStyles }>
        <p style={ copyStyle }>Get this information on your phone, laptop, or tablet.</p>
        <div className='d-flex align-items-start justify-content-around'>
          <IconWeb {...iconProps} />
          <p style={ urlStyle }>lboro.london/travel</p>
        </div>
      </Paper>
    );
  }
}
