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
    };
  }


  selectCity = async (event) => {
    event.preventDefault();

    console.log('hello');
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);

    this.setState({
      pValue: event.target.value,
      showP: true,
    });

    let locationIqUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.value}&format=json`;
    let resData = await axios.get(locationIqUrl);

    this.setState({
      cityObj: resData.data[1],
      mapVisible: true,
    });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select City:</Form.Label>
            <Form.Control as="select" custom onChange={this.selectCity}>
              <option value="irbid">Irbid</option>
              <option value="amman">Amman</option>
              <option value="aqaba">Aqaba</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <div>
          City Name: {this.state.cityObj.display_name},{this.state.cityObj.lat},{this.state.cityObj.lon}
        </div>
        {this.state.mapVisible && <img alt="" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityObj.lat},${this.state.cityObj.lon}&zoom=20&size=400x400&format=jpg&maptype=roadmap`} />}
        {this.state.showP && <p>{this.state.pValue}</p>}
      </div>
    );
  }
}

export default App;
