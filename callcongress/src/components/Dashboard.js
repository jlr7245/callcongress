import React from 'react';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.renderDash = this.renderDash.bind(this);
  }

  listTopics() {
    let topicsArray = []
    for (let topic of this.props.user.topics) {
      topicsArray.push(<li key={topic}>{topic}</li>);
    }
    return topicsArray;
  }

  renderDash() {
    let user = this.props.user;
    if (user.status === 'new' || user.status === 'editing') {
      return (
        <div className='intakeform'>
          <form name='intake' className='intake' onSubmit={(e) => this.props.userDetailsSubmit(e)}>
            <p className='label'>What is your zipcode?</p>
            <input type='number' name='zip' {(user.hasOwnProperty('topicsstring')) ? defaultValue={topicsstring} : defaultValue='' } placeholder='Enter your five-digit zip code here.' />
            <p className='label'>Please enter a few news topics you are interested in. Topics should be comma-separated.</p>
            <input type='text' name='topics' placeholder='ACA, veteran affairs, foreign policy' />
            <button type='submit'>Save</button>
          </form>
        </div>
      )
    } else if (user.status === 'established') {
      return (
        <div className='dashboard'>
          <h1 className='name'>Hello, {user.name}.</h1>
          <h3>Your zip code is set to {user.zip}.</h3>
          <h3>You are watching the following topics:</h3>
          <ul>
            {this.listTopics()}
          </ul>
          <button onClick={(e) => this.props.editUser(e)}>Edit</button>
        </div>
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
