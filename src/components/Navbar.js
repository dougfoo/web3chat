import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          The Tech Stack
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Browser and ReactJS and Web3 API</h4>
        <p>
        <li>ReactJS compatible browser using bootstrap UI components.  I love React.</li>
        <li>Web3 is a JS API interface for Etherium and Smart Contracts.</li>
        </p>
        <hr></hr>
        <h4>Etherium and the MetaMask Wallet</h4>
        <p>
        <li>Etherium (ETH) is the blockchain (2nd to BTC in popularity) - and it's claim to fame is Smart Contracts 
          enable storage of arbitrary data on the blockchain.</li>   
        <li>To use ETH, a Wallet is needed - MetaMask is a popular Chrome based Wallet -- <i>Don't store your life savings here.</i> </li>  
        <i>Also note NFT's are the most famous (only) Smart Contracts in production.</i>
        </p>
        <hr></hr>
        <h4>Smart Contracts and Solidity</h4>
        <p>
        <li>A Smart Contract is like an IDL / Interface for binding arbitrary data to the blockchain.  
          Contracts are registered to an ETH blockchain then usable by all.</li>  
        <li>I defined a simple contract to store chat messages and likes, and registered it to the Ropsten Test ETH network.   
        <i>Note it costs ETH tokens (gas) to register contracts and write data to the blockchain.  On Roptsten it is free</i>.</li>
        </p>
        <hr></hr>
        <h4>Backend - what backend?</h4>
        <p>
        <li>Note there is no backend.  This app is a static HTML/JS webpack hosted in an Azure blob.</li>  
        <li>It reads/stores chat data from the ETH blockchain using Web3 and MetaMask wallets 
        and renders client side using ReactJS.</li>
        Think of this as a <b>really slow, unscalable, and expensive distributed database that has no privacy</b>!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

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

        <Button variant="primary" onClick={() => this.setState({ modalShow: true})}>
        About the Tech
        </Button>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false})}
        />
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
