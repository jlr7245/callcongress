import React from 'react';

class Initial extends React.Component {


  render() {
    return (
      <div className="pagecontainer">
        <div className="left">
          <h1>Decisions are made by those who show up.</h1>
        </div>
        <div className="right">
          <div className="input">
            <input type="number" ref={(input) => this.input = input.value} onChange={(e) => this.props.getInput(e.target.value)} />
            {(this.props.errorMsg) ? <p>Please enter a valid zip.</p> : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default Initial;
