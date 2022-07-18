import React, { Component } from 'react';
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
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
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
      window.alert('Marketplace contract not deployed to detected network.')
      
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
                    <p className="text-left">No MetaMask wallet detected... this is a pre-req and mostly safe</p>
                    <a
                      className="navbar-brand col-sm-3 col-md-2 mr-0"
                      href="https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >Click here for instructions on installing MetaMask</a>
                    <div id="metaimg" className="text-left">
                    <a
                      className="navbar-brand col-sm-3 col-md-2 mr-0"
                      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja"
                      target="_blank"
                      rel="noopener noreferrer">
                        <img
                          src="https://media.geeksforgeeks.org/wp-content/uploads/20210616074219/metamask.PNG"
                          alt="car"
                        />
                      </a>
                    </div>
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
