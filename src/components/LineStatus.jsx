import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import LineStatusText from '../components/LineStatusText';
import LineColours from '../utils/LineColours';
import { lineIcon, lineTextColour } from '../utils/lineTools';

class LineStatus extends Component {
  render() {
    const statuses = this.props.line.lineStatuses.map((status, i) =>
      <LineStatusText status={status} key={i} mode={this.props.line.modeName} />
    );

    return (
      <ListItem
        style={{
          backgroundColor: LineColours[this.props.line.id],
          color: lineTextColour(this.props.line)
        }}
        primaryText={this.props.line.name}
        rightIcon={lineIcon(this.props.line)}
        initiallyOpen={false}
        disabled={this.props.line.lineStatuses[0].statusSeverity === 10}
        autoGenerateNestedIndicator={true}
        primaryTogglesNestedList={true}
        nestedItems={this.props.line.lineStatuses[0].statusSeverity !== 10 ? statuses : undefined}
      />
    );
  }
}

export default LineStatus;
