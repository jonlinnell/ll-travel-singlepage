import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const imageContainerStyle = {
      height: '100%',
      width: '100%',
      backgroundImage: `url(${this.props.bg})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }

    const headerContainerStyle = {
      background: 'rgba(255,255,255,0.7)',
      height: '100%',
      width: '100%',
      padding: '1rem'
    }

    const headerTextStyle = {
      fontSize: '1.5em',
      fontFamily: 'DIN Round Web',
      marginBottom: 0
    }

    const headerSubtitleStyle = {
      marginBottom: 0,
      fontSize: '0.9rem',
      color: 'rgb(120,120,120)'
    }

    return(
      <div style={imageContainerStyle}>
        <div style={headerContainerStyle}>
          <h3 style={headerTextStyle}>{this.props.title}</h3>
          <p style={headerSubtitleStyle}>{this.props.subtitle}</p>
        </div>
      </div>
    );
  }
}