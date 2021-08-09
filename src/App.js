import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationPageWithGraph from './NavigationPageWithGraph';
import EditPage from './EditPage';
import NavigationPage from './NavigationPage';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/edit' component={EditPage} />
        <Route path='/graph' component={NavigationPageWithGraph} />
        <Route path='/' component={NavigationPage} />
      </Switch>
    </Router>
  )
}

export default App;