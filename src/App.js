import React, {Suspense} from 'react';
import Layout from './Components/Layout/Layout';
import './App.css';
import OrderBuilder from './Container/OrderBuilder/OrderBuilder';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import EndPage from '../src/Components/EndPage/EndePage';
import Orders from '../src/Components/Orders/Orders';
import Auth from '../src/Container/Auth/Auth';
import Logout from '../src/Container/Auth/Logout/Logout';
import * as actions from './Store/actions/index';
import { connect } from 'react-redux';
const App = props => {

  let routes = (
    <Switch>
    <Route path="/endpage" component={EndPage} />
    <Route path="/auth" component={Auth} />
    <Route path="/" exact component={OrderBuilder} />
    <Redirect to="/" />
    </Switch>
  )
  if (props.isAuthenticated) {
    routes = (
    <Switch>
      <Route path="/orders" component={Orders} />
      <Route path="/auth" component={Auth} />
      <Route path="/endpage" component={EndPage} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={OrderBuilder} />
      <Redirect to="/" />
    </Switch>
    )
  }
  
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
