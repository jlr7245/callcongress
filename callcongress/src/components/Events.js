import React from 'react';

class Events extends React.Component {
  constructor() {
    super();
    ///=== BINDS ===///
    this.renderEvents = this.renderEvents.bind(this);
    this.addNew = this.addNew.bind(this);
    ///////// absolutely NO state in this component it is NOT ALLOWED
  }

  componentDidMount() {
    console.log('im here');
  }

  renderEvents() {
    return (<p>Events go here...</p>);
  }

  addNew() {
    if (this.props.uid !== null) {
      return (
        <form id='event' className='newevent' onSubmit={(e) => this.props.addNewEvent(e)}>
          <div className='row'>
            <input type='text' required name='name' className='eventname' placeholder='Event Name' />
            <select name='type' required className='select'>
              <option value='' disabled selected>Choose one</option>
              <option value='lecture'>Lecture or Class</option>
              <option value='townmtg'>Town Hall Meeting</option>
              <option value='partymtg'>Party Meeting</option>
              <option value='rally'>Rally</option>
              <option value='protest'>Protest</option>
              <option value='other'>Other</option>
            </select>
            <input type='date' required name='date' className='date'/>
            <input type='time' required name='time' className='time'/>
          </div>
          <div className='row'>
            <textarea name='description' required placeholder='Description'>
            </textarea>
          </div>
          <div className='row'>
            <input type='text' required name='addr' className='addr' placeholder='Address' />
            <input type='text' required name='city' className='city' placeholder='City' />
            <input type='text' required name='state' className='state' placeholder='State' />
            <input type='number' required name='zip' className='zip' placeholder='Zip' />
            <button type='submit'>Save</button>
          </div>
        </form>
        )
    } else return (<p>You must be logged in to add new events.</p>);
  }

  render() {
    return (
      <div className='events-container'>
        {this.renderEvents()}
        {this.addNew()}
      </div>
    )
  }
}

export default Events;
