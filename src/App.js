import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationPage from './NavigationPage';
import EditPage from './EditPage';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/edit' component={EditPage} />
        <Route path='/' component={NavigationPage} />
      </Switch>
    </Router>
  )
}

export default App;