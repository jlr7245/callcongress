import allLegislators from './keys/legislators.json';
import React from 'react';

class Legislators extends React.Component {
  constructor() {
    super();

  }

/*  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false;
    }
  }*/ // this would have the desired behavior of not rerendering the legislators but looking at the docs it looks like it doesn't make a difference

  renderLegislators() {

  }

  render() {
    let legislatorList = allLegislators.results
      .filter((i) => this.props.legislatorsToLoad.indexOf(i.bioguide_id) !== -1);
    console.log(legislatorList);
    return (
        <p>Your legislators go HERE!</p>
      )
  }
}

export default Legislators;
