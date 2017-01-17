import React from 'react';
import AbbreviatedLegislator from './AbbreviatedLegislator';
import allLegislators from './keys/legislators.json';

let legislatorList = allLegislators.results;

class Search extends React.Component {
  constructor() {
    super();
    ///binds///
    this.handleChange = this.handleChange.bind(this);
    this.filterLegs = this.filterLegs.bind(this);
    ///state///
    this.state = {
      searched: null,
    }
  }

  filterLegs() {
    if (this.state.searched !== null) {
      let shortLegsToRender = legislatorList
        .filter((leg) => (leg.first_name.toLowerCase().includes(this.state.searched))
          || (leg.last_name.toLowerCase().includes(this.state.searched))
          || (leg.state_name.toLowerCase().includes(this.state.searched))
          ).map((leg) => {
            return (<AbbreviatedLegislator legislator={leg} />)
          });
      return shortLegsToRender;
    }
  }

  handleChange(e) {
    this.setState({searched: e.target.value.toLowerCase()});
  }

  render() {
    console.log(this.state.searched);
    return (
      <div className='search'>
        <div className='searchbar'>
          <i className='fa fa-search fa-2x wht'></i>
          <input type='text' name='search'
            placeholder='Type here to search.'
            onChange={(e) => this.handleChange(e)} />
        </div>
        <div className='shortlegs'>
          <ul>
            {this.filterLegs()}
          </ul>
        </div>
      </div>
      )
  }
}

export default Search;

