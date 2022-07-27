import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Web3 from 'web3'
import './App.css';
import Chat from '../abis/Chat.json'
import Helpbar from './Helpbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    if (await this.loadWeb3())
      await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      console.log('if window etherum enable')
      console.log(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      console.log('window.web3')
      console.log(window.web3.currentProvider)
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please use Chrome with MetaMask!')
      return false
    }
    return true
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log('acccounts')
    console.log(accounts)
    console.log(accounts[0])
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkType = await web3.eth.net.getNetworkType()
    const networkData = Chat.networks[networkId]
    console.log('network')
    console.log(networkId)
    console.log(networkType)
    console.log(networkData)

    if(networkData) {
      const chat = web3.eth.Contract(Chat.abi, networkData.address)
      this.setState({ chat })
      this.setState({ metamask: true })
      const messageCount = await chat.methods.messageCount().call()
      this.setState({ messageCount })
      console.log("messageCount:" + messageCount)
      // Load messages
      for (var i = 1; i <= messageCount; i++) {
        const message = await chat.methods.messages(i).call()
        console.log('message: '+message.message)
        this.setState({
          messages: [...this.state.messages, message]
        })
        this.pct = 100 * (i / messageCount)
      }
      this.setState({ loading: false})
    } else {
      this.setState({ metamask: false })
      window.alert('Chat contract not deployed to detected network.  Check if Ropsten TEST is setup in MetaMask')      
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      messageCount: 0,
      messages: [],
      metamask: false,
      percentage: 10,
      loading: true,
      minting: false
    }

    this.pct = 1

    this.createMessage = this.createMessage.bind(this)
    this.likeMessage = this.likeMessage.bind(this)
  }

  createMessage(name, likes) {
    this.setState({ minting: true })
    this.state.chat.methods.createMessage(name, likes).send({ from: this.state.account })
    .once('confirmation', (receipt) => {
      window.location.reload()
    })
  }

  likeMessage(id, likes) {
    this.setState({ minting: true })
    this.state.chat.methods.likeMessage(id).send({ from: this.state.account, value: likes })
    .once('confirmation', (receipt) => {
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        <Helpbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.minting 
                ?
                <div className="container-fluid mt-5">
                   <ProgressBar animated now={50} label="processing" />
                </div>
                :
                <div>
                </div>
              }
              { this.state.metamask && ! this.state.minting
                ?
                  <div className="container-fluid mt-5">
                    <ProgressBar now={this.pct} label={`${this.pct}% loading`} />
                  </div>
                : 
                  <div></div>
              }
              { !this.state.metamask 
                ?
                <div id="metainst" className="text-left">
                   <Card>
                    <Card.Header>Setup Step 1 - MetaMask</Card.Header>
                    <Card.Body>
                      <Card.Title>MetaMask Browser Crypto Wallet</Card.Title>
                      <Card.Text>
                        Use Chrome and install MetaMask extension into your browser.  
                        <a
                          href="https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/"
                          target="_blank"
                          rel="noopener noreferrer"
                        > Detailed instructions on installing MetaMask</a>
                      </Card.Text>
                      <Button href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja"
                       variant="primary">Install from Chrome Store</Button>
                    </Card.Body>
                   </Card>
                   <p>&nbsp;</p>
                   <Card>
                    <Card.Header>Setup Step 2 - Switch to Ropsten Test Network</Card.Header>
                    <Card.Body>
                      <Card.Title>Switch the Test Ropsten network</Card.Title>
                      <Card.Text>
                        After installing and logging into MetaMask, you will need to show Test networks and choose Ropsten Test
                      </Card.Text>
                    </Card.Body>
                   </Card>
                   <p>&nbsp;</p>
                   <Card>
                    <Card.Header>Setup Step 3 - Get free Ropsten Test ETHER</Card.Header>
                    <Card.Body>
                      <Card.Title>You will need 1 ETH token to start</Card.Title>
                      <Card.Text>
                        In order to do transact, you will need a little ETH on the Test Net to pay for "gas" transaction fees.  Enter your MetaMask Account code
                      </Card.Text>
                      <Button href="https://faucet.egorfine.com/"
                       variant="primary">Get Free Test ETH</Button>
                    </Card.Body>
                   </Card>
                  </div>
                :
                  <div></div>
              }
            </main>
          </div>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.metamask 
                ? <Main
                   messages={this.state.messages}
                   createMessage={this.createMessage}
                   likeMessage={this.likeMessage} />
                 : 
                 <div></div>
              }
            </main>
          </div>
 
        </div>
      </div>
    );
  }
}

export default App;
