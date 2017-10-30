/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';

const nestedListStyle = {
  backgroundColor: '#FAFAFA',
  color: '#333',
  fontSize: '0.9rem',
  padding: '1rem'
};

const subsequentCallingPointStyle = {
  fontWeight: 'bold',
  marginRight: '0.5rem',
  marginLeft: '12px'
};

const platformNumberSize = '1.3rem';

const platformStyle = {
  fontSize: '0.8rem',
  fontWeight: 400,
  height: platformNumberSize,
  lineHeight: platformNumberSize,
  width: platformNumberSize,
  textAlign: 'center',
  border: '1px solid #CCC',
  borderRadius: '3px',
  backgroundColor: '#FCFCFC',
  marginRight: '12px'
};

const operatorStyle = {
  marginLeft: '12px',
  fontSize: '1rem'
};

const lateTextStyle = {
  fontSize: '0.8rem'
};

class ServiceInformation extends Component {
  render() {
    return (
      <div className='d-flex justify-content-between' style={{ width: '100%' }}>
        <p style={operatorStyle}>{this.props.service.operator}</p>
        {
          this.props.service.platform
          ? <p style={platformStyle}>{this.props.service.platform}</p>
          : null
        }
      </div>
    );
  }
}

class SubsequentCallingPoint extends Component {
  render() {
    return (
      <div className='d-flex justify-content-start'>
        {
          this.props.station.et === 'On time'
          ? <p style={subsequentCallingPointStyle}>{this.props.station.st}</p>
          : <p style={subsequentCallingPointStyle} className='text-danger'>{this.props.station.et}</p>
        }
        <p>{this.props.station.locationName}</p>
      </div>
    );
  }
}

export default class TrainDepartureInfo extends Component {
  constructor(props) {
    super(props);

    const extendedDepartureInfo = [];
    extendedDepartureInfo.push(<ServiceInformation service={props.departure} />);
    props.departure.subsequentCallingPoints.map((station, i) => {
      extendedDepartureInfo.push(<SubsequentCallingPoint key={i} station={station} />);
    });

    this.state = {
      departure: this.props.departure || null,
      extendedDepartureInfo
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ departure: newProps.departure || this.props.departure });
  }
  render() {
    let serviceText = null;
    if (this.state.departure.etd === 'Cancelled') {
      serviceText = <p className='mt-1 mb-0 text-muted' style={lateTextStyle}>This service has been cancelled.</p>;
    } else if (this.state.departure.etd === 'Delayed') {
      serviceText = <p className='mt-1 mb-0 text-muted' style={lateTextStyle}>This service is delayed. No further information is available at this time.</p>;
    } else if (this.state.departure.etd !== 'On time') {
      serviceText = <p className='mt-1 mb-0 text-muted' style={lateTextStyle}>This service is delayed and is expected to depart at {this.state.departure.etd}</p>;
    } 

    return (
      <ListItem
        nestedItems={this.state.departure.etd === 'Cancelled'
        ? undefined
        : this.state.extendedDepartureInfo}
        style={{padding: 'none !important'}}
        primaryTogglesNestedList={true}
        autoGenerateNestedIndicator={false}
        nestedListStyle={nestedListStyle}
        disabled={this.state.departure.etd === 'Cancelled'} // does this work?
      >
        <div className='d-flex w-100 justify-content-start align-items-center'>
          {
            this.state.departure.platform
            ? <p style={platformStyle} className='m-0 mr-3'>{this.state.departure.platform}</p>
            : null
          }
          <p
            className={
              this.state.departure.etd === 'On time'
                ? 'mb-0'
                : 'mb-0 text-danger'
              }
            style={{ fontWeight: 400 }}
          >
            {this.state.departure.destination.name}
          </p>
          <small className='text-muted ml-auto m-0'>{this.state.departure.std}</small>
        </div>
        {serviceText}
      </ListItem>
    );
  }
}
