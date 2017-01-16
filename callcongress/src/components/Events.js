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

  componentDidMount() {
    console.log('im here');
  }

  renderEvents(myEvents) {
    console.log(myEvents);
    if (typeof myEvents === 'string') {
      return <p>Loading...</p>
    } else {
      return <p>ready to load events</p>
    }
    /*for (let event of myEvents) {
      console.log(event);
      let buttonOrNot;
      if (event.belongsTo === this.props.uid) {
        buttonOrNot = (<button>Edit</button>)
      } else {
        buttonOrNot = (<span>⁜</span>)
      }
      return (
        <div className='individualevent'>
            <div className='eventrow'>
              <img src={`../public/media/${event.type}`}  alt={event.type} />
              <h1>{event.name}</h1>
            </div>
            <div className='eventrow'>
              <div className='descparams'>
                <span className='timeanddate'>{moment(event.date).format('dddd, MMM Do, h:mm a')}</span>
                <span className='category'>{event.type}</span>
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
        )
    }*/
  }

  addNew() {
    if (this.props.uid !== null) {
      return (
        <form id='event' className='newevent' onSubmit={(e) => this.props.addNewEvent(e)}>
          <div className='row'>
            <input type='text' required name='name' className='eventname' placeholder='Event Name' />
            <select name='type' required className='select'>
              <option disabled selected>Choose one</option>
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
        {this.renderEvents(this.props.myEvents)}
        {this.addNew()}
      </div>
    )
  }
}

export default Events;
