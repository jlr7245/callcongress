//sample.js
import react from 'react';

        class App extends React.Component {
          constructor() {
            super();

            this.stateChange = this.stateChange.bind(this);

            this.state = {
              foo: 'bar'
            }
          }


          stateChange(change) {
            this.setState({foo: change});
          }

          render() {
            return (
              <div>
                <p>Hello World</p>
                <ChildComponent stateChange={this.stateChange} />
              </div>
              )
          }

        }

        class ChildComponent extends React.Component {
          constructor() {
            super();

            this.renderDecision = this.renderDecision.bind(this);
            this.state = {
              stage: [1],
              hello: 'world'
            }
          }

          componentShouldUpdate() {
            if (this.state.stage.length === 3) {
              return false;
            } else return true;
          }

          renderDecision() {
            let theStage = [...this.state.stage];
            if (this.state.stage.length < 3) {
              theStage.push(1);
              this.setState({stage: theStage});
              return (
                <p>There are {theStage} items.</p>
                )
            } else if (this.state.stage.length === 3) {
              this.props.stateChange(this.state.hello);
              return (
                <p>Hello {this.state.hello}, there are {theStage} items.</p>
              )
            }
          }

          render() {
            return (
              <div>
                (this.renderDecision())
              </div>
            )
          }
        }











