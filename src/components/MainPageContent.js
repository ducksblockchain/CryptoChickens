import React, { Component } from 'react';
import chicken from '../chicken.png';
import FarmerPage from './FarmerPage';
import { Link } from 'react-router-dom';
import './App.css';


class MainPageContent extends Component {

  state = {
    isFlipped: false
  }


  render() {
    return (
      <div id="content" className="Background">
        <div className="content mr-auto ml-auto">
          <h1 className="headercenter">Welcome to Crypto Chickens!</h1>
          <h3 className="headercenter">Mother cluckers</h3>
          <button className="profilebutton"><Link to="/Farmhouse">The Barn</Link></button>
          <button className="profilebutton" onClick={(event) => {
            this.props.makeFarmer()
            console.log(this.props.account)
          }}
          > add chicken
          </button>
        </div>
      <hr class="solid" />
        <div className="transact">
          <h4>Transactions: {this.props.transactions.toString()}</h4>
        </div>
        {/*create chicken*/}
        <div className="theTest">
          <tbody id="chickenlist">
            { this.props.farmers.map((chicks, key) => {
              if(chicks.owner.toString() === this.props.account) {
                return(
                  <tr key={key}>
                    <td>{chicks.name}</td>
                  </tr>
                )
              } else {
                return(console.log("ha nerd"))
              }
            })}
          </tbody>
          {/*Buy some coins*/}
          <div className="buyCoinTest">
            { this.props.farmers.map((chicks, key) => {
              if(chicks.owner === this.props.account) {
                return(
                  <button
                    key={key}
                    name={chicks.id}
                    value={window.web3.utils.toWei('1', 'Ether')}
                    onClick={(event) => {
                      this.props.buyCoins(event.target.name, event.target.value)
                    }}
                  >
                    Get Coins
                  </button>
                )
              } else {
                return(console.log("lame"))
              }
            })}
          <button
            onClick={(event) => {
              console.log(this.props.farmers)
            }}
          >Check
          </button>
          </div>

          {/*Category*/}
        <div classname="Container Container--lg">
          <div class ="SpecialChickenCategory">
            <h2 class="headingcollection">Your Chicks</h2>
            <p class="collection-subtitle">
            "We all like to look at chicks, here's a display of the Chickens you worked so hard to collect."
            </p>
            <div class="SpecialChickenCategory-rows">
              <div class="FeaturedCollectionsGrid">
                <div class="CollectionContainer">
                  <div className="CollectionCard">
                    <div className="card">
                      <div className={`card_inner ${this.state.isFlipped ? 'is-flipped' : ''}`}>
                        <div className="card_face card_face--front">
                          <h2>Common Pack</h2>
                        </div>
                        <div className="card_face card_face--back">
                          <div className="card__content">
                            <img src={chicken} className="collection" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="purchaseButton" onClick={(event) => {
                      this.props.purchasePack()
                      this.setState({ isFlipped: true })
                    }}
                    >
                      Purchase Pack
                    </button>
                  </div>
                </div>
                <div class="CollectionContainer">
                  <div className="CollectionCard">
                    <div className="card">
                      <div className={`card_inner ${this.state.isFlipped ? 'is-flipped' : ''}`}>
                        <div className="card_face card_face--front">
                          <h2>Epic Pack</h2>
                        </div>
                        <div className="card_face card_face--back">
                          <div className="card__content">
                            <img src={chicken} className="collection" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="purchaseButton" onClick={(event) => {
                      this.props.purchasePack()
                      this.setState({ isFlipped: true })
                    }}
                    >
                      Purchase Pack
                    </button>
                  </div>
                </div>
                <div class="CollectionContainer">
                  <div className="CollectionCard">
                    <div className="card">
                      <div className={`card_inner ${this.state.isFlipped ? 'is-flipped' : ''}`}>
                        <div className="card_face card_face--front">
                          <h2>Legendary Pack</h2>
                        </div>
                        <div className="card_face card_face--back">
                          <div className="card__content">
                            <img src={chicken} className="collection" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="purchaseButton" onClick={(event) => {
                      this.props.purchasePack()
                      this.setState({ isFlipped: true })
                    }}
                    >
                      Purchase Pack
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="solid" />
        </div>
          {/*Categories*/}
        <div className="Container Container--lg">
          <div class="FeaturedCollectionsGrid">
            <div class="CollectionContainer">
              <div class="CollectionCard">
                <div class="CollectionCard-header">
                  <div class="CollectionCard-title">Chicken #1</div>
                  <div class="CollectionCard-txt">
                  "Style"
                  "#1"
                    <span class="Cluckclicker" role="button">
                      <span class="Cluckclicker-hearts">
                        <span class="Cluckclicker-heart">
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <img src={chicken} width="16" height="16" className="like-pic" alt="" />
                          </svg>
                        </span>
                        <span class="Cluckclicker-count">64</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="CollectionCard-image CollectionCard-image--shadow CollectionCard--color-chestnut">
                  <img src={chicken} width="30" height="30" className="d-inline-block align-top" alt="" />
                </div>
                <div class="CollectionCard-description">
                <p>Yet to be seem</p>
                </div>
              </div>
            </div>
            <div class="CollectionContainer">
              <div class="CollectionCard">
                <div class="CollectionCard-header">
                  <div class="CollectionCard-title">Chicken #2</div>
                  <div class="CollectionCard-txt">
                  "Style"
                  "#2"
                    <span class="Cluckclicker" role="button">
                      <span class="Cluckclicker-hearts">
                        <span class="Cluckclicker-heart">
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <img src={chicken} className="like-pic" alt="" />
                          </svg>
                        </span>
                        <span class="Cluckclicker-count">69</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="CollectionCard-image CollectionCard-image--shadow CollectionCard--color-chestnut">
                  <img src={chicken} width="30" height="30" className="d-inline-block align-top" alt="" />
                </div>
                <div class="CollectionCard-description">
                <p>Yet to be heard</p>
                </div>
              </div>
            </div>
            <div class="CollectionContainer">
              <div class="CollectionCard">
                <div class="CollectionCard-header">
                  <div class="CollectionCard-title">Chicken #3</div>
                  <div class="CollectionCard-txt">
                  "Style"
                  "#3"
                    <span class="Cluckclicker" role="button">
                      <span class="Cluckclicker-hearts">
                        <span class="Cluckclicker-heart">
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <img src={chicken} className="like-pic" alt="" />
                          </svg>
                        </span>
                        <span class="Cluckclicker-count">21</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="CollectionCard-image CollectionCard-image--shadow CollectionCard--color-chestnut">
                  <img src={chicken} width="30" height="30" className="d-inline-block align-top" alt="" />
                </div>
                <div class="CollectionCard-description">
                <p>Yet to be captured</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="solid" />
        </div>

          {/* add the flip card*/}
          <div className="card">
            <div className={`card_inner ${this.state.isFlipped ? 'is-flipped' : ''}`}>
              <div className="card_face card_face--front">
                <h2>1000 Coins!</h2>
              </div>
              <div className="card_face card_face--back">
                <div className="card__content">
                  <img src={chicken} className="collection" />
                </div>
              </div>
            </div>
          </div>
          <div className="theCoinTest">
            { this.props.farmers.map((chicks, key) => {
              if(chicks.owner === this.props.account) {
                return(
                  <button
                    className="purchaseButton"
                    key={key}
                    name={chicks.id}
                    value={window.web3.utils.toWei('1', 'Ether')}
                    onClick={(event) => {
                      this.props.buyCoins(event.target.name, event.target.value)
                    }}
                  >
                    Get Coins
                  </button>
                )
              } else {
                return(console.log("lame"))
              }
            })}
          </div>
          <hr class="solid" />
          {/* add the flip card*/}
        </div>
      </div>
    );
  }
}

export default MainPageContent;
