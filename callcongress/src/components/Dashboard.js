import React from 'react';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.renderDash = this.renderDash.bind(this);
  }

  renderDash() {
    let user = this.props.user;
    if (user.status === 'new' || user.status === 'editing') {
      return (
        <div className='intakeform'>
          <form name='intake' className='intake' onSubmit={(e) => this.props.userDetailsSubmit(e)}>
            <p className='label'>What is your zipcode?</p>
            <input type='number' name='zip' placeholder='Enter your five-digit zip code here.' />
            <p className='label'>Please enter a few news topics you are interested in. Topics should be comma-separated.</p>
            <input type='text' name='topics' placeholder='ACA, veteran affairs, foreign policy' />
            <button type='submit'>Save</button>
          </form>
        </div>
      )
    } else if (user.status === 'established') {
      return (
        <p>Check out your nifty DASHBOARD!</p>
      )
    }
  }

  render() {
    //let user = this.props.user;
    return (
      <div className='dash'>
        {this.renderDash()}
      </div>
    )
  }
}

export default Dashboard;
