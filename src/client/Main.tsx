import {Provider} from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Link ,NavLink, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import ActivePage from './ActivePage';
import './App.css';
import Category from './Category';
import MakeGroup from './MakeGroup';
import GroupSelect from './store/GroupSelect';


const groupSelect = new GroupSelect();

class Main extends React.Component {

  public render() {

    return (

      <Provider groupSelect={groupSelect}>
        <Router >
          <div className="App">
            <div className="Main-root1">
              <MakeGroup/>
            </div>
            <div className="Main-root2">
              <Category/>
            </div>
            <div className="Main-root3">
              <ActivePage/>
            </div>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default Main;
