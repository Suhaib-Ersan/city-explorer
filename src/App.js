import React from "react";
import "./App.css";

import axios from "axios";
import {Button, Alert } from "react-bootstrap/";

import CityAndWeather from "./components/CityAndWeather";

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
      weatherDataState: [
        { date: " ", desc: " " },
        { date: " ", desc: " " },
        { date: " ", desc: " " },
      ],

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
    console.log({ resData });
    if (resData.status != 200) {
      this.setState({
        AlertDismissibleErrorMessage: `Website returned a code ${resData.status}, `,
      });
      this.AlertDismissibleShow();
    }

    await this.setState({
      cityObj: resData.data[0],
      // mapVisible: true,
    });
    await this.setState({
      mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityObj.lat},${this.state.cityObj.lon}&zoom=13&size=800x650&format=jpg&maptype=roadmap`,
    });
    // console.log(`cityObj `, this.state.cityObj);
    // console.log(`this.mapUrl = `, this.state.mapUrl);

    let weatherGetUrl = `${process.env.REACT_APP_SITE_URL}/cities?reqCity=${event.target.city.value}`;
    let weatherData = axios.get(weatherGetUrl).catch((error) => {
      console.log("weatherData error " + error);
      if (error.response.status != 200) {
        this.setState({
          AlertDismissibleErrorMessage: `Website returned a code ${resData.status}, `,
        });
        this.AlertDismissibleShow();
      }
    });
    this.setState({
      weatherDataState: weatherData.data,
      showInfo: true,
    });
    console.log({ weatherData });
    console.log("weatherDataState = ", this.state.weatherDataState);
  };
  AlertDismissibleClose = () => {
    console.log("showAlert set to false");
    this.setState({
      showAlert: false,
    });
  };
  AlertDismissibleShow = () => {
    this.setState({
      showAlert: true,
    });
    console.log(`AlertDismissibleShow was run`);
  };

  render() {
    return (
      <div className="App">
        <h1 className="titleText">CityExplorer</h1>
        <div className="appContainer">
          <CityAndWeather mapUrl={this.state.mapUrl} weatherData={this.state.weatherDataState} showInfo={this.state.showInfo} cityObj={this.state.cityObj} selectCity={this.state.selectCity} />
          
        </div>
        <Alert show={this.state.showAlert} variant="danger" className="somethingWrongErr">
          <Alert.Heading>{this.AlertDismissibleErrorMessage}Sorry, something went wrong</Alert.Heading>
          <p>
            The server is feeling very sorry for the inconvenience :\ <br />
            Maybe you didn't enter a valid city name?
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.AlertDismissibleClose} variant="outline-danger">
              Close message
            </Button>
          </div>
        </Alert>
      </div>
    );
  }
}

export default App;
