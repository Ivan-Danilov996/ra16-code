import React, { Fragment } from 'react';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import EditForm from './components/EditForm';
// import ServiceAddClassBased from './components/ServiceAddClassBased';
// import ServiceListClassBased from './components/ServiceListClassBased';

function App() {
  return (
    <Router>
      <Fragment>
        <Redirect to='/services' />
          <Route exact path='/services'>
            <ServiceAdd />
            <ServiceList />
          </Route>
          <Route exact path='/services/:id([0-9]+)' component={EditForm} />
      </Fragment>
    </Router>
  );
}

export default App;
