import React from 'react';
import Events from './Events';

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
          <div className='left-dash'>
            <div className='nameandinfo'>
              <h1>Hello, {user.name}.</h1>
              <div className='info'>
                <span className='infolabel'>Your info</span>
                <span className='infodata'> Your zip code is set to {user.zip}.</span>
              </div>
            </div>
            <div className='events'>
              <Events
                addNewEvent={this.props.addNewEvent}
                uid={this.props.uid}
              />
            </div>
          </div>
          <div className='right-dash'>
            <h3>You are watching the following topics:</h3>
              <ul>
                {this.listTopics()}
              </ul>
          </div>
          <div className='settings'>
            <button onClick={(e) => this.props.editUser(e)}><i className="fa fa-cogs fa-3x ltg"></i></button>
          </div>
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
