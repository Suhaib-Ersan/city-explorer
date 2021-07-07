import React from "react";
import "./App.css";

import axios from "axios";
import { Form, Card, Button, Alert } from "react-bootstrap/";
import Weather from "./components/weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityObj: {},
      // mapVisible: false,
      targetEvent: "",

      // pValue: "",
      // showP: false,

      mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=31.9515694,35.9239625&zoom=13&size=600x450&format=jpg&maptype=roadmap`,
      cityName: "",

      showAlert: false,
      AlertDismissibleErrorMessage: "",
      weatherDataState: [{"date":" ","desc":" "},{"date":" ","desc":" "},{"date":" ","desc":" "}],

      showInfo: false,
    };
  }

  selectCity = async (event) => {
    event.preventDefault();

    // console.log("hello");
    // console.log("event = ", event);
    // console.log("event.target = ", event.target);
    // console.log("event.target.city = ", event.target.city);
    // console.log("event.target.city.value = ", event.target.city.value);
    // console.log(event.target.value);

    // this.setState({
    //   pValue: event.target.value,
    //   showP: true,
    // });
    await this.setState({
      cityName: event.target.city.value,
    });
    let locationIqUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.city.value}&format=json`;

    let resData = await axios.get(locationIqUrl);
    // console.log(`resData.data[0] = `, resData.data[0]);

    await this.setState({
      cityObj: resData.data[0],
      // mapVisible: true,
    });
    await this.setState({
      mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityObj.lat},${this.state.cityObj.lon}&zoom=13&size=600x450&format=jpg&maptype=roadmap`,
    });
    // console.log(`cityObj `, this.state.cityObj);
    // console.log(`this.mapUrl = `, this.state.mapUrl);

    let weatherGetUrl= `${process.env.REACT_APP_SITE_URL}/weatherdata?reqCity=${event.target.city.value}`;
    let weatherData = await axios.get(weatherGetUrl);

    this.setState ({
      weatherDataState:weatherData.data,
      showInfo: true,
    })
    console.log({weatherData});
    console.log("weatherDataState = ",this.state.weatherDataState);
  };

  AlertDismissibleClose = () => {
    console.log('showAlert set to false');
    this.setState({
      showAlert: false,
    });
  };
  AlertDismissibleShow = () => {
    this.setState({
      showAlert: true,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="appContainer">
          <h1 className="titleText">CityExplorer</h1>
          <Card className="mapCardBody" style={{ width: "32rem" }}>
            <div>
              <Card.Body>
                <Form onSubmit={this.selectCity}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Check a city</Form.Label>
                    <Form.Control type="text" placeholder="City Name" name="city" />
                  </Form.Group>
                  <Button variant="primary" type="submit" block className="submitButton">
                    Submit
                  </Button>
                </Form>
                  <div className="cityInfoContainer">
                    <div>City Name: {this.state.cityObj.display_name}</div>
                    <div>Lat: {this.state.cityObj.lat}</div>
                    <div>Lon: {this.state.cityObj.lon}</div>
                  </div>
                  
                  {this.state.showInfo && this.state.weatherDataState.map((ele,idx) => {
                    return ( 
                      <Weather 
                        date={ele.date}
                        desc={ele.desc}
                        key={idx}
                      />
                    );})}
                <Card.Text>Check out any country/city/county..etc you want, this will show you the name, latitude and longitude with a static maps image.</Card.Text>
              </Card.Body>
              <Card.Img variant="bottom" src={this.state.mapUrl} />
            </div>
          </Card>
        </div>
        <Alert show={this.state.showAlert} variant="danger" className="somethingWrongErr">
          <Alert.Heading>{this.AlertDismissibleErrorMessage}Sorry, something went wrong</Alert.Heading>
          <p>
            The server is feeling very sorry for the inconvenience :\ <br />
            Maybe you didn't enter a valid city name?
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.AlertDismissibleClose} variant="outline-danger">Close message</Button>
          </div>
        </Alert>

      </div>
    );
  }
}

export default App;
