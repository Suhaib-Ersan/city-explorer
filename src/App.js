import React from "react";
import "./App.css";

import Header from "./components/Header";
import axios from "axios";
import { Form } from "react-bootstrap/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityObj: {},
      mapVisible: false,
      targetEvent: "",

      pValue: "",
      showP: false,

      cityName: "",
    };
  }


  selectCity = async (event) => {
    event.preventDefault();

    console.log('hello');
    console.log('event = ',event);
    console.log('event.target = ',event.target);
    console.log('event.target.city = ',event.target.city);
    console.log('event.target.city.value = ',event.target.city.value);
    // console.log(event.target.value);

    this.setState({
      pValue: event.target.value,
      showP: true,
    });
    await this.setState ({
      cityName: event.target.city.value
    })
    let locationIqUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.city.value}&format=json`;

    
    let resData = await axios.get(locationIqUrl);
    console.log(resData);
    await this.setState({
      cityObj: resData.data[0],
      mapVisible: true,
      
    });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Form  onSubmit={this.selectCity}>
          <input type="text" name="city" />
          <button type="submit" >Explore city</button>
        </Form>
        <div>
          City Name: {this.state.cityObj.display_name},{this.state.cityObj.lat},{this.state.cityObj.lon}
        </div>
        {this.state.mapVisible && <img alt="" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityObj.lat},${this.state.cityObj.lon}&&zoom=13&size=600x600&format=jpg&maptype=roadmap`} />}
        {this.state.showP && <p>{this.state.pValue}</p>}
      </div>
    );
  }
}

export default App;
