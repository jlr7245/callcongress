import allLegislators from './keys/legislators.json';
import React from 'react';
import moment from 'moment';

class Legislators extends React.Component {
  constructor() {
    super();

  }

/*  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false;
    }
  }*/ // this would have the desired behavior of not rerendering the legislators but looking at the docs it looks like it doesn't make a difference

  renderLegislators() {
    let legislatorList = allLegislators.results
      .filter((i) => this.props.legislatorsToLoad.indexOf(i.bioguide_id) !== -1);
    let formattedLegs = legislatorList.map((leg) => {
      let legSite;
      if (leg.hasOwnProperty('website') && leg.website !== null) {
        legSite = (<a href={leg.website} target='_blank'>
               <i className={`fa fa-link fa-2x fa-fw ${leg.party}`}></i>
             </a>);
      } else legSite='';
      let legTwit;
      if (leg.hasOwnProperty('twitter_id') && leg.twitter_id !== null) {
       legTwit = (<a href={`https://www.twitter.com/${leg.twitter_id}`} target='_blank'>
               <i className={`fa fa-twitter fa-2x fa-fw ${leg.party}`}></i>
             </a>)
     } else legTwit = '';
      let legFb;
      if (leg.hasOwnProperty('facebook_id') && leg.facebook_id !== null) {
        legFb = (<a href={`https://www.facebook.com/${leg.facebook_id}`} target='_blank'>
               <i className={`fa fa-facebook fa-2x fa-fw ${leg.party}`}></i>
             </a>)
      } else legFb = '';
      let legTube;
      if (leg.hasOwnProperty('youtube_id') && leg.youtube_id !== null){
       legTube = (<a href={`https://www.youtube.com/user/${leg.youtube_id}`} target='_blank'>
               <i className={`fa fa-youtube fa-2x fa-fw ${leg.party}`}></i>
             </a>)
     } else legTube = '';

      return (
        <li className={leg.party}>
         <div className='leghead'>
           <img src={`https://theunitedstates.io/images/congress/225x275/${leg.bioguide_id}.jpg`} />
           <div className='headinfo'>
             <i className={`fa fa-circle-o fa-2x ${leg.party}`}></i>
             <h3>{leg.first_name} {leg.last_name}</h3>
             <span className='represents'>{leg.state_name}</span>
             <p className='currentterm'>Started {moment(leg.term_start).format('MMM d, YYYY')}</p>
             <p className='currentterm'>Ends {moment(leg.term_end).format('MMM d, YYYY')}</p>
           </div>
         </div>
         <div className='legbody'>
           <div className='legadd'>
            <i className='fa fa-map-marker fa-3x'></i>
             <p>{leg.office}<br/>
               Washington DC 20510</p>
           </div>
           <div className='legphn'>
             <i className="fa fa-phone fa-3x"></i>
             <h3>{leg.phone}</h3>
           </div>
           <div className='legsoc'>
            {legSite} {legTwit} {legFb} {legTube}
           </div>
         </div>
       </li>
      )
    });
    return formattedLegs;
  }

  render() {
    return (
        <div className='leglist'>
          <ul>
            {this.renderLegislators()}
          </ul>
        </div>
      )
  }
}

export default Legislators;


/*
<div className='legsoc'>
             {if (leg.hasOwnProperty('website') && leg.website !== null) return (<a href={leg.website} target='_blank'>
               <i className='fa fa-link fa-2x fa-fw'></i>
             </a>)}
            {if (leg.hasOwnProperty('twitter_id') && leg.twitter_id !== null) return (<a href={`https://www.twitter.com/${leg.twitter_id}`} target='_blank'>
               <i className='fa fa-2x fa-fw fa-twitter'></i>
             </a>) }
             {if (leg.hasOwnProperty('facebook_id') && leg.facebook_id !== null) return (<a href={`https://www.facebook.com/${leg.facebook_id}`} target='_blank'>
               <i className='fa fa-2x fa-fw fa-facebook'></i>
             </a>)}
             {if (leg.hasOwnProperty('youtube_id') && leg.youtube_id !== null) return(<a href='https://www.youtube.com/user/ZeldinForCongress' target='_blank'>
               <i className='fa fa-2x fa-fw fa-youtube'></i>
             </a>)}
*/ /// all of these need to be put in variables unfortunately