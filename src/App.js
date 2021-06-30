import React, { Suspense } from 'react';
import './App.css';
import AppLayout from './components/app-layout';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "view-home" */ './screens/home')
);
const ViewDetail = React.lazy(() =>
  import(/* webpackChunkName: "view-detail" */ './screens/detail')
);
const ViewCart = React.lazy(() =>
  import(/* webpackChunkName: "view-cart" */ './screens/cart')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "view-auth" */ './screens/error')
);

function App() {

  return (
    <AppLayout>
      <div className="pt-5-3"></div>
      <div className="container-lg">
        <Suspense fallback={<div>Loading ...</div>}>
          <Router>
            <Switch>
              <Route
                path="/home"
                render={props => <ViewHome {...props} />}
              />
              <Route
                path="/detail"
                render={props => <ViewDetail {...props} />}
              />
              <Route
                path="/cart"
                render={props => <ViewCart {...props} />}
              />
              <Route
                path="/error"
                exact
                render={props => <ViewError {...props} />}
              />
              <Route
                path="/"
                exact // eslint-disable-next-line
                render={props => <Redirect to="/home" />}
              />
            </Switch>
          </Router>
        </Suspense>
      </div>
    </AppLayout>
  );
}

export default App;
