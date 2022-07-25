import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TechStackModal(props) {
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


function Web123Modal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Brief Primer on Web X.0 History
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Web 1.0</h4>
        <p>
        <li>The original web - NCSA Mosaic, Netscape, IE ~ circa 1990's.</li>
        <li>Mostly static pages with limited dynamic content (old CGI-BIN).</li>
        </p>
        <hr></hr>
        <h4>Web 2.0</h4>
        <p>
        <li>Dynamic html thru the evolution of Javascript over the past 2 decades.</li>   
        <li>After a long war of web frameworks, now dominated by JS tools (React, Vue, etc).</li>
        <li>Heavy personalization focus.</li>  
        </p>
        <hr></hr>
        <h4>Web 3.0</h4>
        <p>
        <li>More marketing than anything, coined by the Etherium camp as a way to decentralize the web using blockchain.</li>  
        <li>In reality it is just linking the web to blockchain with Smart Contracts.</li>
        <li>A similar idea is Decentralized Autonomous Organizations funded and run by blockchains but this is
            just an idea.</li>
        </p>
        <hr></hr>
        <h4>Web 4.0</h4>
        <p>
        <li>Not much synthesis yet, but most articles say it is the symbiotic web.</li>  
        </p>
        <hr></hr>
        <h4>Web 5.0</h4>
        <p>
        <li>Coined by the Bitcoin camp (Jack Dorsey and Elon Musk) to enable Bitcoin as a more generic distributed ledger/database.</li>  
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
      modal1Show: false,
      modal2Show: false
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

        <Button variant="primary" 
                onClick={() => this.setState({ modalShow1: true})}>
         About the Tech
        </Button>

        <Button variant="secondary" 
                onClick={() => this.setState({ modalShow2: true})}>
         About Web 3.0 
        </Button>

        <TechStackModal show={this.state.modalShow1}
          onHide={() => this.setState({ modalShow1: false})}
        />
        <Web123Modal show={this.state.modalShow2}
          onHide={() => this.setState({ modalShow2: false})}
        />
      </nav>
    );
  }
}

export default Helpbar;
