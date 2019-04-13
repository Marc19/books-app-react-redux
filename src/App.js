import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainLayout from './Components-Pages/MainLayout'
import ConnectedBooks from './Components-Pages/MyBooks'
import ConnectedSearchBooks from './Components-Pages/SearchBooks'
import NotFound from './Components-Pages/NotFound'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          {
            <Switch>
              <Route path="/" exact
                     render={() => <MainLayout isHomeActive={true}>
                                    <ConnectedBooks/>
                                   </MainLayout>}/>

              <Route path="/search"
                     render={() => <MainLayout isSearchActive={true}>
                                    <ConnectedSearchBooks/>
                                   </MainLayout>}/>


              <Route render={() => <MainLayout>
                                    <NotFound/>
                                   </MainLayout>}/>                                                     
            </Switch>
          }
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
