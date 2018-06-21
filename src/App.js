import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'd299f4e716774f3c846c3f17a1d368d1'
 });

const particlesOptions = {
  particles: {
   number: {
     value: 30,
     density: {
       enable: true,
       value_area : 800
     }
   }
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event)=> {
    console.log(event.target.value);
  }

  onButtonSubmit = ()=> {
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className= "particles"
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        {/*
        <FaceRecognition />
        */}

      </div>
    );
  }
}

export default App;
