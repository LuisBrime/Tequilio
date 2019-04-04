import React, { Component } from 'react';
import TopBar from './components/TopBar';
import Home from './components/Home';
import Tequileras from './components/Tequileras';
import Search from './components/Search';
import Historial from './components/MiHistorial';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <BrowserRouter>
          <div>
            <Route path='/' exact component={Home} />
            <Route path='/sku' exact component={Search} />
            <Route path='/tequileras' exact component={Tequileras} />
            <Route path='/historial' exact component={Historial} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
