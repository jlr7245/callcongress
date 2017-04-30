# CallCongress.how
![Call Congress](https://raw.githubusercontent.com/jlr7245/callcongress/master/meta/sreenshot.jpg "callcongress.how")

## What is CallCongress.how?
Now more than ever, the cultural paradigm is ripe for citizen political involvement. Division is high, freedoms are threatened, and legislators' phones are busier than ever. CallCongress.how provides easy access to legislator contact information and a platform to post political events.

## Technical Discussion
<dl>
<dt>React.js</dt>
<dd>This project was bootstrapped with <a href="https://github.com/facebookincubator/create-react-app" target="_blank">Create React App</a> and built using the React library. I made use of the power and speed of React to create a swift and beautiful user interface.</dd>
<dt>Other Libraries</dt>
<dd>This project uses Moment.js to render dates & times and Axios to make API calls.</dd> 
<dt>CSS3 Flexbox</dt>
<dd>The fluidity and responsiveness of the site is due to styling it using CSS3 Flexbox.</dd>
</dl>

### Notes on app structure
The app is driven by three main page types -- initial, dash, and search results -- and a login component that displays no matter what a user is doing on the site. Of these four elements, the login was the most complex to build, and required a lot of lifecycle methods and API calls to be made all at once. The login has its own state and cycles through four or five different login stages without the rest of the app needing to be aware of what it's doing.

As an illustration, here is my `componentDidUpdate()` method from the login component.

``` javascript
componentDidUpdate() {
    if (this.state.loginState === 'attempting') {
      fbaseAXIOS.get('/users/userarray.json')
        .then((res) => {
          this.userArray = res.data;
        })
        .catch((err) => console.log(err));
    } else if (this.state.loginState === 'new-confirm') {
      (this.userArray !== undefined && this.userArray !== null) ? this.userArray.push(this.state.newuser) : this.userArray = [this.state.newuser];
      fbaseAXIOS.put('/users/userarray.json', this.userArray)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.setState({loginState: 'logged-in'});
      this.props.setUser(this.state.uid);
    } else if (this.state.loginState === 'established-confirm') {
      this.props.setUser(this.state.uid);
      this.setState({loginState: 'logged-in'});
    }
}
```

This was far & away the most complex part of creating the app, and took the longest period of time to brainstorm. 

![Login state wireframe](https://raw.githubusercontent.com/jlr7245/callcongress/master/meta/sat6.jpg)

## The Making of CallCongress.How

<dl>
<dt>Author</dt>
<dd>J Silverstein</dd>
<dt>Credits</dt>
<dd>Event icons are from a number of people on TheNounProject: Ana María Lora Macias, iconsphere, Lorena Salagre, Sherrinford, Juan Pablo Bravo, and Wilson Joseph.</dd>
<dd>I was the recipient of some very helpful advice on stackoverflow: <a href="http://stackoverflow.com/questions/41654541/using-shouldcomponetupdate-to-break-a-state-set-loop" target="_blank">see here</a>.</dd>
<dd>Most of the inspirational quotes on the home page are from the West Wing.</dd>
<dd>Thanks to instructors Ariana and Vince for helping me work through authentication and API issues.</dd>
</dl>

## Opportunities for Future Growth
While I am very pleased with how far I got in the time allotted for the project, there is always room for growth. Due to some troubles accessing APIs while developing locally, there were a number of features I was unable to add. Additionally, a few elements do not work as elegantly as they could. Here are the features I expected to be able to add in this stage of the project, but could not:

- User's news topics populate with recent articles on page load
- Legislator elements display the legislator's most recent vote in the user dashboard & in the top part of the search page.
- The events are filtered by the user's zip code to only display events in the surrounding area.
- From the search page, a logged-in user can click on a legislator in the search results and add them to their "watched senators" area on their dashboard.

## Future Stages of Development
CallCongress.how has been a project of mine for some time. Initially envisioned as a static site serving up phone scripts to make calling congresspeople easier for those who may not be at their most eloquent on the phone, it's evolved in my mind into something more interactive. I don't think it'll ever be a full-blown social network, exactly, but it's evolved into a tool that can be used to build political momentum, keep voters informed about their legislators' activity, and bring like-minded people together.

That being said, a resource of user-submitted phone scripts for political action would still be valuable, and I'd like to add in a way for users to add scripts and tag them with the appropriate bills, topics, people, or locations. This would also require a way to moderate the submitted scripts.

Beyond that, it would be challenging but exciting to add local government officials to the mix. State and local governmental APIs are hard to find, and the ones I have found are frequently abandoned (for example, the [Indiana API](http://docs.api.iga.in.gov/api.html) hasn't been updated since 2014). However, change doesn't start at the top -- it starts at the bottom, with grassroots movements of well-informed citizens who work together to make a difference in their towns, counties, districts, and states. 

In the far future, my vision for CallCongress.how includes a national network of people working to provide information on local politics in real-time.
