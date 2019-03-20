import React, { Component } from 'react';
import mock from './assets/mockup-interface.png';
import videoDemo from './assets/thumbnail.mp4';
import videoChar from './assets/video_2.mp4';
import './Presentation.css'
class Prensentation extends Component {
  render() {
    return (
      <div id="pres">
        <div id="triangle-topright">
        </div>
        <div className="char">
          <div>
            <h4>Réalisez votre personnage</h4>
            <p>Débloquez de nouveaux looks au fur et à mesure de votre progression dans le jeu</p>
          </div>
          <video src={videoChar} autoPlay loop muted></video>
        </div>
        <div className="demo">
          <h4>Une interface de jeu immersive</h4>
          <p>Immergez-vous dans une scène de jeu roleplay au sein de notre interface immersive.</p>
          <div className="mock">
            <img src={mock} />
            <video src={videoDemo} autoPlay loop muted></video>
          </div>
        </div>
      </div>
    );
  }
}

export default Prensentation;