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
        <li>ReactJS compatible browser using bootstrap UI components.</li>
        <li>Web3 is a JS API interface for Etherium and Smart Contracts.</li>
        </p>
        <hr></hr>
        <h4>Etherium (ETH) and the MetaMask Wallet</h4>
        <p>
        <li>ETH's differentiator is Smart Contracts (SC) which enable storing arbitrary data.</li>   
        <li>To use ETH, a Wallet is needed - MetaMask is a popular Chrome based extension.</li>  
        <li>Truffle and Infuria (or Remix) are also needed to bridge and deploy contracts.</li>  
        <i>NFT's are the most famous (only) Smart Contracts in production on ETH.</i>
        </p>
        <hr></hr>
        <h4>Smart Contracts (SC) and Solidity</h4>
        <p>
        <li>A SC is like an IDL / Interface and is registered and deployed to ETH.</li>  
        <li>I defined a 'Chat' contract to store messages and likes, and registered to the Ropsten Test network.</li>
        <i>Note it costs ETH tokens (gas) to register contracts and write data.  Roptsten is a test net so it is free</i>.
        </p>
        <hr></hr>
        <h4>Backend - what backend?</h4>
        <p>
        <li>There is no backend server.  This app is a static HTML/JS webpack hosted in an Azure blob.</li>  
        <li>Chat data is read/written directly to ETH using Web3 and MetaMask - using ReactJS as the UI.</li>
        Think of ETH as a <b>really slow, unscalable, and expensive distributed database that has no privacy</b>!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class Helpbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  render() {
    return (
      <nav className="Helpbar Helpbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="Helpbar-brand col-sm-3 col-md-2 mr-0"
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
        <ul className="Helpbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Helpbar;
