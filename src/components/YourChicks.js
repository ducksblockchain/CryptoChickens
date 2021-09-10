import React, { Component } from 'react';
import './App.css';
import CryptoChickens from '../abis/CryptoChickens.json';
import Web3 from 'web3';

class YourChicks extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = CryptoChickens.networks[networkId]
    if(networkData) {
      const cryptochickens = web3.eth.Contract(CryptoChickens.abi, networkData.address)
      this.setState({ cryptochickens })
      const totalSupply = await cryptochickens.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Tokens
      let balanceOf = await cryptochickens.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await cryptochickens.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await cryptochickens.methods.tokenURI(id).call()
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      cryptochickens: null,
      totalSupply: 0,
      tokenURIs: []
    }
  }



  render() {
    return (
      <div id="app">
        <div className="yourChickenbackground">
          <h2>Your Chickens!</h2>
          <div class="center">
            <h5 className="coinage">Tokens Collected:<span className="coinage" id="result">&nbsp;{this.state.tokenURIs.length}</span></h5>
            <div className="content" >
              { this.state.tokenURIs.map((tokenURI, key) => {
                return(
                  <img
                    className="member"
                    id={key}
                    alt=""
                    draggable="true"
                    key={key}
                    src={tokenURI}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YourChicks;
