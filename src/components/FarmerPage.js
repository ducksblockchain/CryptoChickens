import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import {CARD_ARRAY} from './OurCards';
import {Common_cards, Rare_cards, Memetastic_cards} from './OurCards';
import CryptoChickens from '../abis/CryptoChickens.json';
import NotFoundPage from './NotFoundPage';

class FarmerPage extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.setState({ cardArray: CARD_ARRAY.sort() })
    this.setState({ commonCards: Common_cards.sort() })
    this.setState({ rareCards: Rare_cards.sort() })
    this.setState({ memetasticCards: Memetastic_cards.sort() })
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

  chooseImage = (cardId) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.generalBreed(
        this.state.account,
        window.location.origin + CARD_ARRAY[cardId].img.toString()
      )
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, CARD_ARRAY[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, try to refresh the page :)')
    }
  }

  chooseCommonImage = (cardId, price) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.generalBreed(
        this.state.account,
        window.location.origin + Common_cards[cardId].img.toString()
      )
      .send({ from: this.state.account, value: price })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Common_cards[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, try to refresh the page :)')
    }
  }

  chooseRareImage = (cardId, price) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.mintRareBreed(
        this.state.account,
        window.location.origin + Rare_cards[cardId].img.toString()
      )
      .send({ from: this.state.account, value: price })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Rare_cards[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, try to refresh the page :)')
    }
  }

  chooseEpicImage = (cardId, price) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.mintMemeBreed(
        this.state.account,
        window.location.origin + Memetastic_cards[cardId].img.toString()
      )
      .send({ from: this.state.account, value: price })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Memetastic_cards[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, try to refresh the page :)')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      cryptochickens: null,
      totalSupply: 0,
      tokenURIs: [],
      cardArray: [],
      commonCards: [],
      rareCards: [],
      memetasticCards: [],
      cards: []
    }
  }

  render() {
    return(
      <div>
        <NotFoundPage
        getTokenURI={this.getTokenURI}
        imageSource={this.imagSource}
        chooseImage={this.chooseImage}
        chooseCommonImage={this.chooseCommonImage}
        chooseRareImage={this.chooseRareImage}
        chooseEpicImage={this.chooseEpicImage}
        tokenURIs={this.state.tokenURIs}
        cardArray={this.state.cardArray}
        commonCards={this.state.commonCards}
        rareCards={this.state.rareCards}
        memetasticCards={this.state.memetasticCards}
        cryptochickens={this.state.cryptochickens}
        account={this.state.account} />
      </div>
    );
  }
}

export default FarmerPage;
