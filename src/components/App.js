import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
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
    const networkData = Marketplace.networks[networkId]
    console.log('network')
    console.log(networkId)
    console.log(networkType)
    console.log(networkData)

    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      this.setState({ metamask: true })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})
    } else {
      this.setState({ metamask: false })
      window.alert('Marketplace contract not deployed to detected network.  Check if Ropsten TEST is setup in MetaMask')      
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      metamask: false,
      loading: true
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />
              }
            </main>
          </div>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.metamask
                ? <div id="loader" className="text-center"><p className="text-center">..MetaMask....</p></div>
                : <div id="metainst" className="text-left">
                   <Card>
                    <Card.Header>Setup Step 1 - MetaMask</Card.Header>
                    <Card.Body>
                      <Card.Title>MetaMask Browser Crypto Wallet</Card.Title>
                      <Card.Text>
                        Use Chrome and install MetaMask extension into your browser.
                        <a
                          className="navbar-brand col-sm-3 col-md-2 mr-0"
                          href="https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >Detailed instructions on installing MetaMask</a>
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
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
