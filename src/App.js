import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import SliderCom from './components/sliderCom'
import {router as routers} from './router.js'
import 'antd/dist/antd.css';
import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
        </div>
        <div className="contain">
          <div className="slider">
            <SliderCom></SliderCom>
          </div>
          <div className="contain_main">
            <Switch>
              {
                routers.map((i,index) => (
                  <Route exact={i.exact} path={i.path} component={i.component} key={index}></Route>
                ))
              }
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
