import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event)=> {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = ()=> {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err=> console.log(err));
  }

  onRouteChange = (route)=> {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className= "particles"
              params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home'
          ? <div> 
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition
              imageUrl={this.state.imageUrl}
              box = {this.state.box} />
            </div>
          : (
              this.state.route === 'signin' 
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
