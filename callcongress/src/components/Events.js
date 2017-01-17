import React from 'react';
import moment from 'moment';

class Events extends React.Component {
  constructor() {
    super();
    ///=== BINDS ===///
    this.renderEvents = this.renderEvents.bind(this);
    this.addNew = this.addNew.bind(this);
    ///////// absolutely NO state in this component it is NOT ALLOWED
  }



  renderEvents() {
    let allEvents = this.props.allevents;
    let eventArray = [];
    for (let event of allEvents) {
      let buttonOrNot;
      if (event.belongsTo === this.props.uid) {
        buttonOrNot = (<div className='buttons'><button onClick={(e) => this.props.editEvent(e, event.key)}>Edit</button> <button onClick={(e) => this.props.deleteEvent(e, event.key)}>Delete</button></div>)
      } else {
        buttonOrNot = (<span className='notyours' title='You must own an event in order to edit it.'>⁜</span>)
      }
      if (this.props.eventEdited !== event.key) {
        eventArray.push(
          <div className='individualevent' key={event.key}>
              <div className='eventrow'>
                <img src={`./media/${event.type}.jpg`}  alt={event.type} />
                <h1>{event.name}</h1>
              </div>
              <div className='eventrow'>
                <div className='descparams'>
                  <span className='timeanddate'>{moment(event.date).format('dddd, MMM Do, h:mm a')}</span>
                  <span className='category blbg'>{event.type}</span>
                </div>
              </div>
              <div className='eventrow'>
                <div className='desc'>
                  <p>{event.description}</p>
                </div>
              </div>
              <div className='eventrow wide'>
                <span className='addr'>{event.address}, {event.city}, {event.state} {event.zip}</span>
                {buttonOrNot}
              </div>
            </div>
          );
      } else if (this.props.eventEdited === event.key) {
        eventArray.push(
          <div key={event.key}>
            <form id='event' className='newevent' onSubmit={(e) => this.props.saveEventEdit(e, event.key)}>
              <div className='row'>
                <input type='text' required name='name' className='eventname' defaultValue={event.name} />
                <select name='type' defaultValue={event.type} required className='select'>
                  <option disabled selected>Choose one</option>
                  <option value='lecture'>Lecture or Class</option>
                  <option value='townmtg'>Town Hall Meeting</option>
                  <option value='partymtg'>Party Meeting</option>
                  <option value='rally'>Rally</option>
                  <option value='protest'>Protest</option>
                  <option value='other'>Other</option>
                </select>
                <input type='date' defaultValue={moment(event.date).format('YYYY-MM-DD')} required name='date' className='date'/>
                <input type='time' defaultValue={moment(event.date).format('HH:mm')} required name='time' className='time'/>
              </div>
              <div className='row'>
                <textarea name='description' defaultValue={event.description} required >
                </textarea>
              </div>
              <div className='row'>
                <input type='text' required name='addr' defaultValue={event.address} className='addr' />
                <input type='text' defaultValue={event.city} required name='city' className='city'  />
                <input type='text' required name='state' className='state' defaultValue={event.state} />
                <input type='number' required name='zip' className='zip' placeholder={event.zip} />
                <button type='submit'>Save</button>
              </div>
            </form>
          </div>
        );
      }
    }
    return eventArray.reverse();
  }

  addNew() {
    if (this.props.uid !== null) {
      return (
        <form id='event' className='newevent' onSubmit={(e) => this.props.addNewEvent(e)}>
          <div className='row'>
            <input type='text' required name='name' className='eventname' placeholder='Event Name' />
            <select name='type' required className='select'>
              <option disabled>Choose one</option>
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
        <h1>Your Events</h1>
        <div className='established-events'>
          {this.renderEvents()}
        </div>
        {this.addNew()}
      </div>
    )
  }
}

export default Events;
