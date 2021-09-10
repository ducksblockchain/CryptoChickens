import React from 'react';
import './Popup.css';

function FirstContainer(props) {
  return (props.triggerfirst) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
        {props.children}
        <div className="popup-body">
          <div className="content">
            { props.tokenURIs.map((tokenURI, key) => {
              return(
                <img
                  className="memberpopup"
                  draggable="true"
                  id={key}
                  alt=""
                  src={tokenURI}
                  onClick={(event) => {
                    const card = document.getElementById(key)
                    console.log(card)
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  ) : "";
}

export default FirstContainer;
