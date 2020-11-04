import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "../Signin";
import Table from '../Pages/table'
function index() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/login" component={Signin} />
            <Route exact path="/table" component={Table} />
          </Switch>
        </Router>
      </div>
    );
}

export default index
