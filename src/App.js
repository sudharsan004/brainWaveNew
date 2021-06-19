import React from 'react'
import { Route, Switch } from 'react-router'
import Homepage from './pages/Homepage/Homepage'
import Namepage from './pages/Namepage/Namepage'
import Mainpage from './pages/Mainpage/Mainpage'

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Homepage />
        </Route>

        <Route path='/Name'>
          <Namepage />
        </Route>

        <Route path='/Main'>
          <Mainpage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
