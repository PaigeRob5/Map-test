import React, {Component} from 'react';


class Map extends Component{
    constructor(){
        super();
        this.state ={
            origin: '',
            destination: '',
            routes:[]
        }

    }
    getDirections(){
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.origin}&destination=${this.state.destination}&key=AIzaSyDuUrjzdH9mqeS_GyxgPSzvu0R7ls_8zmo`).then(
            res => res.json())
            .then(routes => this.setState({routes: routes}))
            console.log(this.state.routes);
    }

  
    render(){
        return(
    <div>
        <div>Map</div>
        <div>
            Origin:
            <input onChange ={(e)=>this.setState({origin: e.target.value})}/>
            Destination:
            <input onChange = { (e) => this.setState({destination: e.target.value})}/>
            <button onClick = {()=>this.getDirections()}> Get Directions</button>
        </div>
    </div>
        )
    }
}
export default Map;