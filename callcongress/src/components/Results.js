import React from 'react';
import Legislators from './Legislators';
import Search from './Search';

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
      <Search />
    </div>
    )
  }
}

export default Results;

