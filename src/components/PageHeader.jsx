import React, { Component } from 'react';

const titleContainerStyles = {
  padding: '1rem 2rem 0 2rem',
  marginTop: '-1rem',
  textAlign: 'center',
  width: '100%',
  backgroundColor: '#361163'
}

const titleStyles = {
  fontFamily: 'DIN Round Web',
  color: 'white',
  fontSize: '4rem',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
}

const dateStyle = {
  color: 'white',
  fontFamily: 'DIN Round Web',
  fontSize: '1.5rem'
}

function getLocalTimeString() {
  let d = new Date();
  return { date: d.toLocaleDateString('en-GB'), time: d.toLocaleTimeString('en-GB') };
}

export default class PageHeader extends Component {
  constructor() {
    super();
    let d = getLocalTimeString();
    this.state = {
      date: d.date,
      time: d.time
    }
  }

  updateDate = () => {
    let d = getLocalTimeString();
    this.setState({
      date: d.date,
      time: d.time
    });
  }

  componentDidMount = () => { this.interval = setInterval(this.updateDate, 1000); }

  componentWillUnmount = () => { clearInterval(this.interval); }

  render() {
    return (
      <div className='hoc' style={ titleContainerStyles }>
        <h1 style={ titleStyles } className='float-left'>TRAVEL INFORMATION</h1>
        <p className='float-right' style={ dateStyle }>{this.state.time}<br />{this.state.date}</p>
      </div>
    );
  }
}