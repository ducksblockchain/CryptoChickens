import React, { Component } from 'react';
import './App.css';
import birdy from '../6oa.gif';
import { Link } from 'react-router-dom';
import FarmerPage from './FarmerPage';
import memepack from '../memepack.png';
import rarepack from '../RarePack.png';
import commonpack from '../CommonPack.png';
import chickenLogo2 from '../ChickenLogo2.png';
import chickenLogo from '../LogoChicken.png';
import twitter from '../footer-twitter.svg';
import opensea from '../footer-opensea.svg';
import discord from '../footer-discord.svg';

class Main extends Component {

  render() {
    return(
      <div id="app">
        <div id="project">
          <div id="home">
          {/*Start of section 1*/}
            <div className="landingfullbackground">
              <div className="landingBackground">
                <div className="landingContainer">
                  <div className="landing">
                    <div class="wrapper">
                      <div id="connection">
                        <button className="disconnect" tokekenURIs={this.props.tokenURIs}><Link to="/YourChickens">Your Chickens</Link></button>
                      </div>
                    </div>
                    <div id="hero">
                      <div className="left grid-2c">
                        <img src={chickenLogo2} id="title" alt="" />
                        <p className="landingparagraph">
                          Welcome to crypto chickens a NFT game to help support charity. Mint your starter pack chickens and open packs to start your chicken collection!
                          Breed your chickens together to get new and rarer chickens as you go. See if you can collect them all and have a chance to get an ultra rare
                          meme-tastic chicken.
                        </p>
                      </div>
                      <div className="right grid-1c">
                        <div className="cadre">
                          <div className="pineapple">
                            <img src={chickenLogo} className="logoimage" alt="" />
                          </div>
                          <div className="borderice"></div>
                        </div>
                        <div className="waveright"></div>
                        <div className="topackbutton">
                          <div className="mintleft">
                            <button className="packbutton" onClick={(event) => {
                              document.getElementById("packs").scrollIntoView()
                            }}>Get Packs!</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End of section 1*/}
            {/*Start of Starter_Pack section*/}
            <div className="starterpackfullbackground">
              <div className="starterpackbackground">
                <div className="starterpacksection">
                  <h3 class="headingcollection">Starter Pack</h3>
                  <p class="collection-subtitle">
                    Mint your starter chickens here for FREE and get breeding for more rare chickens
                  </p>
                  { this.props.revealTimestamp >= Date.now()
                    ? <div className="content">
                        { this.props.starterPack.map((card, key) => {
                          return(
                            <img
                              className="card"
                              alt=""
                              draggable="false"
                              key={key}
                              src={card.img}
                              name={card.name}
                              data-id={key}
                            />
                            )
                          })}
                      </div>
                    : <div className="content">
                        { this.props.starterPack.map((card, key) => {
                          return(
                            <img
                              className="card"
                              alt=""
                              key={key}
                              src={card.img}
                              name={card.name}
                              draggable="false"
                              data-id={key}
                              onClick={(event) => {
                                let cardId = event.target.getAttribute('data-id')
                                console.log(cardId)
                                this.props.chooseStarterImage(cardId)
                              }}
                            />
                            )
                          })}
                      </div>
                  }
                </div>
              </div>
            </div>
            {/*End of Starter Pack section*/}
            {/*Start of Packs added*/}
            <div id="packs">
              <div className="packsectionfullbackground">
                <div className="packsectionbackground">
                  <div className="packpurchasesection">
                    <div classname="Container Container--lg">
                      <div class ="SpecialChickenCategory">
                        <h3 class="packheading">Packs!</h3>
                        <p class="pack-subtitle">
                        Purchase a pack to get a random chicken from their respective categories. Try your luck to get a pack exclusive chicken from each category!
                        </p>
                        <div class="SpecialChickenCategory-rows">
                          <div class="FeaturedCollectionsGrid">
                            <div class="CollectionContainer">
                              <div className="CollectionCard">
                                <div className="pack">
                                  <div className='pack_inner'>
                                    <div className="pack_face pack_face--front">
                                      <img src={commonpack} alt="" />
                                    </div>
                                  </div>
                                </div>
                                { this.props.revealTimestamp >= Date.now()
                                  ? <p className="coinage">Coming Soon...</p>
                                  : <button
                                      className="btnPacks"
                                      value={window.web3.utils.toWei('0.001', 'Ether')}
                                      onClick={(event) => {
                                        function randomCard(min, max) {
                                          return Math.random() * (max - min) + min;
                                        }
                                        let cardId = Math.round(randomCard(0, 20))
                                        this.props.chooseCommonPack(cardId, event.target.value)
                                      }}
                                    >
                                      Purchase Pack
                                    </button>
                                }
                                { this.props.maxCommonpack === 300 ? <p className="coinage">Sold Out! (transaction will be rejected)</p> : ""}
                              </div>
                            </div>
                            <div class="CollectionContainer">
                              <div className="CollectionCard">
                                <div className="pack">
                                  <div className='pack_inner'>
                                    <div className="pack_face pack_face--front">
                                      <img src={rarepack} alt="" />
                                    </div>
                                  </div>
                                </div>
                                { this.props.revealTimestamp >= Date.now()
                                  ? <p className="coinage">Coming Soon...</p>
                                  : <button
                                      className="btnPacks"
                                      value={window.web3.utils.toWei('0.05', 'Ether')}
                                      onClick={(event) => {
                                        function randomCard(min, max) {
                                          return Math.random() * (max - min) + min;
                                        }
                                        let cardId = Math.round(randomCard(0, 12))
                                        this.props.chooseRarePack(cardId, event.target.value)
                                      }}
                                    >
                                      Purchase Pack
                                    </button>
                                }
                                { this.props.maxRarepack === 260 ? <p className="coinage">Sold Out! (transaction will be rejected)</p> : ""}
                              </div>
                            </div>
                            <div class="CollectionContainer">
                              <div className="CollectionCard">
                                <div className="pack">
                                  <div className='pack_inner'>
                                    <div className="pack_face pack_face--front">
                                      <img src={memepack} alt="" />
                                    </div>
                                  </div>
                                </div>
                                { this.props.revealTimestamp >= Date.now()
                                  ? <p className="coinage">Coming Soon...</p>
                                  : <button
                                      className="btnPacks"
                                      value={window.web3.utils.toWei('0.1', 'Ether')}
                                      onClick={(event) => {
                                        function randomCard(min, max) {
                                          return Math.random() * (max - min) + min;
                                        }
                                        let cardId = Math.round(randomCard(0, 14))
                                        this.props.chooseMemePack(cardId, event.target.value)
                                      }}
                                    >
                                      Purchase Pack
                                    </button>
                                }
                                { this.props.maxMemepack === 100 ? <p className="coinage">Sold Out! (transaction will be rejected)</p> : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End of Packs added*/}
            {/*Start of Mint History*/}
            <div className="mintpackfullbackground">
              <div className="mintpackbackground">
                <div className="mintpacksection">
                  <div className="minthistorycontainer">
                    <div className="center">
                      <h3 className="mintHistory">MINT HISTORY</h3>
                      <div className="content">
                        <img className="member" src={this.props.tokenURIs[this.props.tokenURIs.length - 1]} alt="" />
                        <img className="member" src={this.props.tokenURIs[this.props.tokenURIs.length - 2]} alt="" />
                        <img className="member" src={this.props.tokenURIs[this.props.tokenURIs.length - 3]} alt="" />
                        <img className="member" src={this.props.tokenURIs[this.props.tokenURIs.length - 4]} alt="" />
                        <img className="member" src={this.props.tokenURIs[this.props.tokenURIs.length - 5]} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End of Mint History*/}
            {/*Start of the barn*/}
            <div className="barnfullbackground">
              <div className="barnbackground">
                <h3 className="headingcollectionthebarn">The Barn</h3>
                <p className="barncollection-subtitle">Use any two chickens and try your luck to breed a new ultra rare chicken!</p>
                { this.props.maxMemebreed === 45 ? <h2 className="coinage">Closed.</h2> : <FarmerPage /> }
              </div>
            </div>
            {/*End of the Barn*/}
            {/*Start of Charity*/}
            <div className="charityfullbackground">
              <div className="charitybackground">
                <div className="charitypacksection">
                  <div className="ourcharitycontainer">
                    <div className="charitycontent">
                      <span className="charity-subtitle">about our charity</span>
                      <h3 className="charity-title">Wildlife Conservation</h3>
                      <p className="charity-description">WCS saves wildlife and wild places worldwide through science, conservation action, education, and inspiring people to value nature. WCS envisions a world where wildlife thrives in healthy lands and seas, valued by societies that embrace and benefit from the diversity and integrity of life on earth.</p>
                    </div>
                    <div className="charityPhoto">
                      <div>
                        <a href="https://www.wcs.org/">
                          <img className="charityPhoto" src="https://www.wcs.org/assets/wcsorg/logos/green-blue-bright-1d2d4911480bc53cd651f527ab1e79d2.svg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End of Charity*/}
            {/*Start of Collection*/}
            <div className="collectionfullbackground">
              <div className="collectionbackground">
                <div className="collection">
                  <div className="iceberg2"></div>
                  <div className="iceberg3"></div>
                  <div className="icesmall1"></div>
                  <div className="icesmall2"></div>
                  <div className="header">
                    <h2>The collection</h2>
                    <a href="https://opensea.io/collection/chicken-derby" target="_blank" rel="noopener noreferrer" className="btn">
                      Show more
                    </a>
                  </div>
                  <h2 id="commoncard_section">Common</h2>
                  { this.props.revealTimestamp >= Date.now()
                    ? <div class="content">
                      { this.props.commonteaser.map((card, key) => {
                        return(
                          <img
                            key={key}
                            alt=""
                            className="memberCommon"
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                    : <div class="content">
                      { this.props.commonpack.map((card) => {
                        return(
                          <img
                            className="memberCommon"
                            alt=""
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                  }
                  { this.props.revealTimestamp >= Date.now() ? <h2>More Coming Soon...</h2> : "" }
                  <h2 id="rarecard_section">Rare</h2>
                  { this.props.revealTimestamp >= Date.now()
                    ? <div class="content">
                      { this.props.rareteaser.map((card, key) => {
                        return(
                          <img
                            key={key}
                            alt=""
                            className="memberRare"
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                    : <div class="content">
                      { this.props.rarepack.map((card) => {
                        return(
                          <img
                            className="memberRare"
                            alt=""
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                  }
                  { this.props.revealTimestamp >= Date.now() ? <h2>More Coming Soon...</h2> : "" }
                  <h2 id="epiccard_section">Meme-tastic</h2>
                  { this.props.revealTimestamp >= Date.now()
                    ? <div class="content">
                      { this.props.memeteaser.map((card, key) => {
                        return(
                          <img
                            key={key}
                            alt=""
                            className="memberMeme"
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                    : <div class="content">
                      { this.props.memetasticpack.map((card) => {
                        return(
                          <img
                            className="memberMeme"
                            alt=""
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                  }
                  { this.props.revealTimestamp >= Date.now() ? <h2>More Coming Soon...</h2> : "" }
                  <h2 id="exclusive_section">Pack Exclusives</h2>
                  { this.props.revealTimestamp >= Date.now()
                    ? <h2>More Coming Soon...</h2>
                    : <div class="content">
                      { this.props.exclusives.map((card) => {
                        return(
                          <img
                            className="memberexc"
                            alt=""
                            src={card.img}
                            name={card.name}
                          />
                        )
                      })}
                      </div>
                  }
                </div>
              </div>
            </div>
            {/*End of Collection*/}
            <div className="teamfullbackground">
              <div className="teambackground">
                <div className="team">
                  <h2 className="coinage">Socials</h2>
                </div>
                <div className="social">
                  <a href="https://twitter.com/CryptoChickens1" target="_blank">
                    <img className="icon" src={twitter} alt="" />
                  </a>
                  <a href="" target="_blank">
                    <img className="icon" src={opensea} alt="" />
                  </a>
                  <a href="https://discord.gg/PN8w2qtf" target="_blank">
                    <img className="icon" src={discord} alt="" />
                  </a>
                </div>
              </div>
            </div>
            {/*End of Team*/}
            <footer id="footer">
              <div className="social">
                <img src={birdy} alt="" />
                <img src={birdy} alt="" />
                <img src={birdy} alt="" />
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
