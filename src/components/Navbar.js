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
        At the top layer is a ReactJS compatible browser using bootstrap UI components.  I love React.
        Web3 is a JS API that greatly simplifies interaction with Etherium and Smart Contracts and enables it for JS development.
        </p>
        <hr></hr>
        <h4>Etherium and the MetaMask Wallet</h4>
        <p>
        Etherium (ETH) is the blockchain (2nd to BTC in popularity) - and it's claim to fame is Smart Contracts.  
        Contracts enable storage of arbitrary "things" on the blockchain.   
        To use ETH, a Wallet is needed and some ETH (cash - since nothing is free).  
        MetaMask is a Chrome based Wallet -- <i>I wouldn't recommend storing your $millions here, but it is ok for goofing around.</i>   
        Also note NFT's are the most famous Smart Contracts but most others are prototypes and deployed on test networks like Ropsten, 
        just like my demo.
        </p>
        <hr></hr>
        <h4>Smart Contracts and Solidity</h4>
        <p>
        A Smart Contract is really just an IDL / Interface file written in Solidity that binds arbitrary data to the blockchain.
        A compiled contract is registered to an ETH blockchain and then anyone can use it.  
        I defined a simple contract to store chat messages and likes, and registered it to the Ropsten Test ETH blockchain.   
        Note it costs ETH tokens (gas) to register contracts as well as to use them to write a chat message or like one!  (On Repsten
        it is all test and fake $$$ thank god).
        </p>
        <hr></hr>
        <h4>Backend - what backend?</h4>
        <p>
        Note there is no backend.  This app you are using is a static HTML/JS webpack hosted in an Azure blob.  
        It reads/stores chat data from the ETH blockchain contracts, using Web3 and MetaMask wallets 
        and renders client side using ReactJS and Web3 API.
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
