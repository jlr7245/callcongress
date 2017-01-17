import React from 'react';

class Initial extends React.Component {
  constructor() {
    super();
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.inspirationalQuotes=[
    'Decisions are made by those who show up.',
    'The voice of the people cannot be silenced.',
    'We must do better and we will do better.',
    'There is work to be done.',
    'Thoughtful & committed citizens can change the world.'
    ]
  }

  shouldComponentUpdate(nextProps) {
    return !(this.props === nextProps); /// doesnt have the desired effect :(
  }

  componentDidUpdate() {
    console.log('update');
  }

  render() {
    return (
      <div className="init">
        <div className="left">
          <h1>{this.inspirationalQuotes[Math.floor(Math.random() * this.inspirationalQuotes.length)]}</h1>
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
