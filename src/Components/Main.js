import React, {Component} from 'react';
import './App.css';
import Form from './Form';
import Presentation from './Presentation';
import {scroolAnchor, scroolHiden} from '../scrool';
import Admin from './Admin';
import logo from './assets/logo.png';
class Main extends Component {
  constructor(props){
    super(props);
    this.active = this.active.bind(this);
    this.link = this.link.bind(this);
  }
  link(event){
    setTimeout(()=>this.setState({}),100);
  }
  active(value){
    return (window.location.hash == value ? "nav-link active" : "nav-link");
  }
  componentDidMount() {
    scroolAnchor();
    scroolHiden();
  }
  render() {
    var route = (<div><Form /><div className="blur"></div><Presentation /></div>);
    if (window.location.pathname == "/admin")
      route = <Admin/>;

    return (
      <div className="App">
        <header className="App-header">
        <div className="logo">
        <img src={logo}/>
        <a href="/">
          LOUPSGAROUS.FR
          <span>bêta</span>
        </a>
        </div>
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className={this.active('#sub')} onClick={this.link} href="/#sub">Inscription</a>
            </li>
            <li name="lol" className={"nav-item"}>
              <a className={window.location.hash == "#pres" ? "nav-link active" : "nav-link"} onClick={this.link} href="/#pres">Présentation</a>
            </li>
          </ul>
        </header>
        {route}
        </div>
    );
  }
}

export default Main;
