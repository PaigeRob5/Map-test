import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapComponent extends React.Component {

  getDirections=(e)=>
  {
    const {google} = this.props;
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    var request = {
    origin: this.state.origin,
    destination: this.state.destination,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    console.log(result)
    if (status === 'OK') {
      directionsDisplay.setDirections(result);
    }
    else
    {
        window.alert('Directions request failed due to ' + status);
    }
  });
  }
  componentDidMount=()=> {
    console.log(this)
    this.google = this.props.google
    console.log(this.google)
  /*  this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();*/
  }
  onMapReady=(mapProps, map)=>
  {
    console.log("Map is ready dude!!" , mapProps, map)
      const {google} = this.props;
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map)

  }
render() {
  if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <div>
          Origin:
          <input onChange ={(e)=>this.setState({origin: e.target.value})}/>
          Destination:
          <input onChange = { (e) => this.setState({destination: e.target.value})}/>
          <button onClick = {()=>this.getDirections()}> Get Directions</button>
        </div>
      <Map google={this.props.google} zoom={14} onReady={this.onMapReady}>

      </Map>
    </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyA6CPBW4zwuXvVkmZSIFQaNjeuVQML9HtI',
  version: '3'
})(MapComponent)
/*
export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>MyComponent</div>);
  }
}
*/
