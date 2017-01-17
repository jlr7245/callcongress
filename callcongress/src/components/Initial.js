import React from 'react';

class Initial extends React.Component {


  render() {
    return (
      <div className="init">
        <div className="left">
          <h1>Decisions are made by those who show up.</h1>
        </div>
        <div className="right">
          <div className="input">
            <input type="number" onKeyPress={(e) => this.props.getInput(e.target.value)} />
            <p className="ziplabel rd">Please enter your zip code to get started.</p>
            {(this.props.errorMsg) ? <p>Please enter a valid zip.</p> : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default Initial;


/// change that input to a form
