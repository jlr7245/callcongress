import React from 'react';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.renderDash = this.renderDash.bind(this);
  }

  componentDidMount() {
    console.log(`i'm boutta do it`); /// i DON't want to make api calls here because i DON'T want to run into the state disaster that i ran into in fakeauth. okay. I'm going to have to draw this out.
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
            <label>What is your zipcode?</label>
            <input type='number' name='zip' placeholder='Enter your five-digit zip code here.' />
            <label>Please enter a few news topics you are interested in.</label>
            <input type='text' name='topics' placeholder='ACA, veteran affairs, foreign policy' />
            <label className='sm'> Topics should be comma-separated.</label>
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
