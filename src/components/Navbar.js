import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.foostack.ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          FooStack web3's Blockchain Demo 
        </a>
        <a
          className="navbar-light col-sm-3 col-md-2 mr-0"
          href="/tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          About the Tech 
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
