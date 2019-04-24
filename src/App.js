import React, { Component } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    let style = {height:'100%', maxWidth:'80%', verticalAlign:'middle', marginLeft:'10%', marginRight:'10%', marginTop:'1%'}
    return (
      <div style={style} >
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
