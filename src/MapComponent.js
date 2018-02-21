import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class MapComponent extends React.Component {
  state = {
    data:[],
    origin:'indore',
    destination:'dewas',
    distance:''
  }
  onButtonClick=(e)=>
  {
    this.calculateDistance()
    this.getDirections()
  }
  getDirections=()=>
  {
    var request = {
    origin: this.state.origin,
    destination: this.state.destination,
    travelMode: 'DRIVING'
    };
  this.directionsService.route(request, (result, status)=> {
    console.log(result, 'status ', status)
    if (status === 'OK') {
      this.directionsDisplay.setDirections(result);
    }
    else
    {
        window.alert('Directions request failed due to ' + status);
    }
  });
  }
  calculateDistance=()=>
  {
    const {google} = this.props;
    var service = new google.maps.DistanceMatrixService;
       service.getDistanceMatrix({
         origins: [this.state.origin],
         destinations: [this.state.destination],
         travelMode: 'DRIVING',
         unitSystem: google.maps.UnitSystem.METRIC,
         avoidHighways: false,
         avoidTolls: false
       }, (response, status)=> {
         if (status !== 'OK') {
           alert('Error was: ' + status);
         } else {
           console.log('distance response ', response.rows[0].elements[0].distance.text)
           this.setState({distance:response.rows[0].elements[0].distance.text})
           /*var originList = response.originAddresses;
           var destinationList = response.destinationAddresses;
           var outputDiv = document.getElementById('output');
           outputDiv.innerHTML = '';*/
          /* deleteMarkers(markersArray);

           var showGeocodedAddressOnMap = function(asDestination) {
             var icon = asDestination ? destinationIcon : originIcon;
             return function(results, status) {
               if (status === 'OK') {
                 map.fitBounds(bounds.extend(results[0].geometry.location));
                 markersArray.push(new google.maps.Marker({
                   map: map,
                   position: results[0].geometry.location,
                   icon: icon
                 }));
               } else {
                 alert('Geocode was not successful due to: ' + status);
               }
             };
           };

           for (var i = 0; i < originList.length; i++) {
             var results = response.rows[i].elements;
             geocoder.geocode({'address': originList[i]},
                 showGeocodedAddressOnMap(false));
             for (var j = 0; j < results.length; j++) {
               geocoder.geocode({'address': destinationList[j]},
                   showGeocodedAddressOnMap(true));
               outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                   ': ' + results[j].distance.text + ' in ' +
                   results[j].duration.text + '<br>';
             }
           }*/
         }
       });
  }
  componentDidMount=()=> {
    this.google = this.props.google
    console.log(this)
  }
  onMapReady=(mapProps, map)=>
  {
    this.map = map
    const {google} = this.props;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map)
  }
render() {
  if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <div>
          {this.state.data}
        </div>
        <div>
          Origin:
          <input value={this.state.origin}
            onChange ={(e)=>this.setState({origin: e.target.value})}/>
          Destination:
          <input
            value={this.state.destination}
            onChange = { (e) => this.setState({destination: e.target.value})}/>
          <button onClick = {()=>this.onButtonClick()}> Get Directions</button>
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
