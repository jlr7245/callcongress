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


// Search maybe should take a method 'addToWatch' that is passed down to AbbreviatedLegislator and adds that legislator's bioguide_id to the user's watchlist... patches it back up to firebase... yikes. it's fine it's cool it's fine
