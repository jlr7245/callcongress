import React from 'react';
import Legislators from './Legislators';

class Results extends React.Component {

  render() {
    return(
    <div className='resultspage'>
      <div className='location'>
        <div className='zipholder'>
          <h1 className='reszip'>{this.props.zip}</h1>
        </div>
        <div className='legislators'>
          <Legislators
            legislatorsToLoad={this.props.legislatorsToLoad}
          />
        </div>
      </div>
      <div className='search'>
        <p>Search component goes here</p>
      </div>
    </div>
    )
  }
}

export default Results;
