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


  render() {
    return (
      <div className='init'>
        <div className='left'>
          <h1>{this.inspirationalQuotes[Math.floor(Math.random() * this.inspirationalQuotes.length)]}</h1>
        </div>
        <div className='right'>
          <form className='initialinput' onSubmit={(e) => this.props.getInput(e)}>
            <input name='zip' type='number' required /> <button type='submit'><i className='fa fa-search fa-4x wht'></i></button>
            <p className='ziplabel rd'>Please enter your zip code to get started.</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Initial;

