import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import MetaMask from '../MetaMask.png';
import CryptoChickens from '../abis/CryptoChickens.json';
import Navbar from './Navbar';
import Main from './Main';
import {CARD_ARRAY, Common_cards, Rare_cards, Memetastic_cards, Starter_Pack, Common_pack, Rare_pack, Memetastic_pack, Exclusives, Common_teaser, Rare_teaser, Meme_teaser} from './OurCards';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    this.setState({ cardArray: CARD_ARRAY.sort() })
    this.setState({ commonCards: Common_cards.sort() })
    this.setState({ rareCards: Rare_cards.sort() })
    this.setState({ memetasticCards: Memetastic_cards.sort() })
    this.setState({ starterPack: Starter_Pack.sort() })
    this.setState({ commonpack: Common_pack.sort() })
    this.setState({ rarepack: Rare_pack.sort() })
    this.setState({ memetasticpack: Memetastic_pack.sort() })
    this.setState({ exclusives: Exclusives.sort() })
    this.setState({ commonteaser: Common_teaser.sort() })
    this.setState({ rareteaser: Rare_teaser.sort() })
    this.setState({ memeteaser: Meme_teaser.sort() })
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
      this.setState({ loading: true })
    }
  }

  async loadBlockchainData() {
    if (window.ethereum) {
      const web3 = window.web3
      //Load account
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      console.log(this.state.account.toString())
      const networkId = await web3.eth.net.getId()
      const networkData = CryptoChickens.networks[networkId]
      if(networkData) {
        const cryptochickens = new web3.eth.Contract(CryptoChickens.abi, networkData.address)
        this.setState({ cryptochickens })
        const revealTimestamp = await cryptochickens.methods.reveal_timestamp.call()
        this.setState({ revealTimestamp })
        //Load Maxes
        const maxMemepack = await cryptochickens.methods.MEMEPACK.call()
        this.setState({ maxMemepack })
        const maxRarepack = await cryptochickens.methods.RAREPACK.call()
        this.setState({ maxRarepack })
        const maxCommonpack = await cryptochickens.methods.COMMONPACK.call()
        this.setState({ maxCommonpack })
        const maxMemebreed = await cryptochickens.methods.MEMEBREED.call()
        this.setState({ maxMemebreed })
        //Load Tokens
        let balanceOf = await cryptochickens.methods.balanceOf(accounts[0]).call()
        for (let i = 0; i < balanceOf; i++) {
          let id = await cryptochickens.methods.tokenOfOwnerByIndex(accounts[0], i).call()
          let tokenURI = await cryptochickens.methods.tokenURI(id).call()
          this.setState({
            tokenURIs: [...this.state.tokenURIs, tokenURI]
          })
        }
      } else {
        window.alert('contract not deployed to detected network')
      }
    } else {
      this.setState({ loading: true })
    }
  }

  chooseStarterImage = (cardId) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.starterMint(
        this.state.account,
        window.location.origin + Starter_Pack[cardId].img.toString()
      )
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Starter_Pack[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, refresh the page');
    }
  }

  chooseCommonPack = (cardId, price) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.mintCommonPack(
        this.state.account,
        window.location.origin + Common_pack[cardId].img.toString()
      )
      .send({ from: this.state.account, value: price })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Common_pack[cardId].img.toString()]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, refresh the page');
    }
  }

  chooseRarePack = (cardId, price) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.mintRarePack(
        this.state.account,
        window.location.origin + Rare_pack[cardId].img.toString()
      )
      .send({ from: this.state.account, value: price })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Rare_pack[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, refresh the page');
    }
  }

  chooseMemePack = (cardId, price) => {
    try {
      cardId = cardId.toString()
      this.state.cryptochickens.methods.mintMemePack(
        this.state.account,
        window.location.origin + Memetastic_pack[cardId].img.toString()
      )
      .send({ from: this.state.account, value: price })
      .on('transactionHash', (hash) => {
        this.setState({
          tokenURIs: [...this.state.tokenURIs, Memetastic_pack[cardId].img]
        })
        console.log(this.state.tokenURIs)
      })
    } catch(e) {
      window.alert('Something went wrong, refresh the page');
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: false,
      tokenURIs: [],
      cardArray: [],
      commonCards: [],
      rareCards: [],
      memetasticCards: [],
      starterPack: [],
      commonpack: [],
      rarepack: [],
      memetasticpack: [],
      exclusives: [],
      revealTimestamp: 0,
      commonteaser: [],
      rareteaser: [],
      memeteaser: [],
      maxMemepack: 0,
      maxRarepack: 0,
      maxCommonpack: 0,
      maxMemebreed: 0
    }
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} revealTimestamp={this.state.revealTimestamp} />
        <div className="container-fluid mt-5">
          <div className="row">
          { this.state.loading
                ? <div id="loader" className="text-center"><h1 className="looserPage">This Site requires MetaMask you bum! Quick get it below before your friends think you're lame!!!</h1></div>
                : <Main
                  memeteaser={this.state.memeteaser}
                  rareteaser={this.state.rareteaser}
                  maxMemepack={this.state.maxMemepack}
                  maxRarepack={this.state.maxRarepack}
                  maxCommonpack={this.state.maxCommonpack}
                  maxMemebreed={this.state.maxMemebreed}
                  commonteaser={this.state.commonteaser}
                  currentDate={this.state.currentDate}
                  revealTimestamp={this.state.revealTimestamp}
                  loadWeb3={this.loadWeb3}
                  chooseRarePack={this.chooseRarePack}
                  chooseMemePack={this.chooseMemePack}
                  chooseCommonPack={this.chooseCommonPack}
                  chooseStarterImage={this.chooseStarterImage}
                  commonCards={this.state.commonCards}
                  starterPack={this.state.starterPack}
                  rareCards={this.state.rareCards}
                  memetasticCards={this.state.memetasticCards}
                  exclusives={this.state.exclusives}
                  commonpack={this.state.commonpack}
                  rarepack={this.state.rarepack}
                  memetasticpack={this.state.memetasticpack}
                  cardArray={this.state.cardArray}
                  tokenURIs={this.state.tokenURIs}
                  loading={this.state.loading}
                  account={this.state.account} />
          }
          { this.state.loading ? <a href="https://metamask.io/"><img src={MetaMask} className="metamask" alt="" /></a> : "" }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
