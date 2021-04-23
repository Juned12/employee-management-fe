import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;