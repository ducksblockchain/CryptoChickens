import React from 'react';
import './App.css';
import FirstContainer from './FirstContainer.js'
import { useState } from 'react';

function NotFoundPage(props) {
  const cards = [];

  const drop = e => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');

    const card = document.getElementById(card_id);
    console.log(card)
    cards.push(card);
    try {
      card.style.display = 'block';
      e.target.appendChild(card);
    } catch(e) {
      window.alert('looks like you used the wrong chickens, try your tokens instead');
    }
  }

  const dragOver = e => {
    e.preventDefault();
  }

  const dragStart = e => {
    const target = e.target;

    e.dataTransfer.setData('card_id', target.id);

    console.log(target.id);

  }

  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div id="app">
    {/*THE FACTORY IS HERE*/}
      <div className="factory">
        <div
          className="firstContainer"
          id={props.id}
          onDrop={drop}
          onDragOver={dragOver}
        >
          { props.children }
        </div>
        <FirstContainer triggerfirst={buttonPopup} setTrigger={setButtonPopup} tokenURIs={props.tokenURIs} />
        <button
          className="kingbtn"
          value={window.web3.utils.toWei('0.001', 'Ether')}
          onClick={(event) => {
            if (cards.length === 2) {
              let firstCard = cards[0]
              let secondCard = cards[1]
              let firstCardSource = firstCard.src.split("/")
              let secondCardSource = secondCard.src.split("/")
              let firstCardAttribute = ""
              let secondCardAttribute = ""
              console.log(firstCard)
              for (let i = 0; i < props.cardArray.length; i++) {
                let cardSource = props.cardArray[i].img.split("/")
                if (cardSource[2] === firstCardSource[4]) {
                  firstCardAttribute = props.cardArray[i].rarity
                }
                if (cardSource[2] === secondCardSource[4]) {
                  secondCardAttribute = props.cardArray[i].rarity
                }
              }
              if ((firstCardAttribute && secondCardAttribute === 'common') || (secondCardAttribute && firstCardAttribute === 'common')) {
                function randomCard(min, max) {
                  return Math.random() * (max - min) + min;
                }
                let cardIdCommon = Math.round(randomCard(0, 16))
                let cardIdRare = Math.round(randomCard(0, 9))
                let cardChance = Math.round(randomCard(0, 100))
                if (cardChance >= 10) {
                  props.chooseCommonImage(cardIdCommon, event.target.value)
                } else {
                  props.chooseRareImage(cardIdRare, event.target.value)
                }
              } else if (firstCardAttribute && secondCardAttribute === 'rare') {
                function randomCard(min, max) {
                  return Math.random() * (max - min) + min;
                }
                let cardIdCommon = Math.round(randomCard(0, 16))
                let cardIdRare = Math.round(randomCard(0, 9))
                let cardIdEpic = Math.round(randomCard(0, 14))
                let cardChanceRare = Math.round(randomCard(0, 100))
                if (cardChanceRare <= 70) {
                  props.chooseCommonImage(cardIdCommon, event.target.value)
                } else if (70 < cardChanceRare && cardChanceRare < 90) {
                  props.chooseRareImage(cardIdRare, event.target.value)
                } else {
                  props.chooseEpicImage(cardIdEpic, event.target.value)
                }
              } else if (firstCardAttribute && secondCardAttribute === 'meme-tastic') {
                function randomCard(min, max) {
                  return Math.random() * (max - min) + min;
                }
                let cardIdRare = Math.round(randomCard(0, 9))
                let cardIdEpic = Math.round(randomCard(0, 14))
                let cardChance = Math.round(randomCard(0, 100))
                if (cardChance >= 50) {
                  props.chooseRareImage(cardIdRare, event.target.value)
                } else {
                  props.chooseEpicImage(cardIdEpic, event.target.value)
                }
              } else {
                window.alert('You got no Chicks bruv')
              }
            } else {
              window.alert('something clucked up, try to refresh the page')
            }
          }}
        >
        Breed
        </button>
        <div
          className="secondContainer"
          id={props.id}
          onDrop={drop}
          onDragOver={dragOver}
        >
          { props.children }
        </div>
      </div>
      <div class="centertokens">
        <p className="scroll-subtitle">Drag and Drop Your Chickens In Their Containers to Breeed.</p>
        <p className="centerparagraph"></p>
        <h5 className="tokenheader">Tokens Collected:<span className="coinage" id="result">&nbsp;{props.tokenURIs.length}</span></h5>
        <div className="scroll" >
          { props.tokenURIs.map((card, key) => {
            return(
              <img
                className="member"
                alt=""
                id={key}
                draggable="true"
                onDragOver={dragOver}
                onDragStart={dragStart}
                key={key}
                src={card}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
