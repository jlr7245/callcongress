import React from 'react';

class AbbreviatedLegislator extends React.Component {

  render() {
    return <p>{this.props.legislator.first_name}</p>
  }
}

export default AbbreviatedLegislator;
