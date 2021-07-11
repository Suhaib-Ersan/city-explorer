import React from "react";
import "./App.css";

import axios from "axios";
import { Button, Alert } from "react-bootstrap/";

import Main from "./components/Main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityObj: {},
      targetEvent: "",
      mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=31.9515694,35.9239625&zoom=13&size=800x750&format=jpg&maptype=roadmap`,
      cityName: "",
      showAlert: false,
      AlertDismissibleErrorMessage: "",
      weatherDataState: [
        { date: " ", desc: " " },
        { date: " ", desc: " " },
        { date: " ", desc: " " },
      ],
      moviesDataState: [],
      showInfo: false,
    };
  }

  selectCity = async (event) => {
    event.preventDefault();

    await this.setState({
      cityName: event.target.city.value,
    });
    let locationIqUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.city.value}&format=json`;

    let resData = await axios.get(locationIqUrl);
    // console.log({ resData });
    if (resData.status != 200) {
      this.setState({
        AlertDismissibleErrorMessage: `Website returned a code ${resData.status}, `,
      });
      this.AlertDismissibleShow();
    }

    await this.setState({
      cityObj: resData.data[0],
    });
    await this.setState({
      mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityObj.lat},${this.state.cityObj.lon}&zoom=13&size=800x750&format=jpg&maptype=roadmap`,
    });
    // localhost:3001/cities?cityName=amman
    let weatherGetUrl = `${process.env.REACT_APP_SITE_URL}/cities?cityName=${event.target.city.value}`;
    let weatherData;
    try {
      weatherData = await axios.get(weatherGetUrl);
    } catch (error) {
      console.log("weatherData error " + error);
      if (error.response.status != 200) {
        this.setState({
          AlertDismissibleErrorMessage: `Website returned a code ${resData.status}, `,
        });
        this.AlertDismissibleShow();
      }
    }
    let moviesGetUrl = `${process.env.REACT_APP_SITE_URL}/movies?searchQuery=${event.target.city.value}`;
    let moviesData;
    try {
      moviesData = await axios.get(moviesGetUrl);
    } catch (error) {
      console.log("moviesData error " + error);
      if (error.response.status != 200) {
        this.setState({
          AlertDismissibleErrorMessage: `Website returned a code ${resData.status}, `,
        });
        this.AlertDismissibleShow();
      }
    }
    console.log({weatherData});
    this.setState({
      weatherDataState: weatherData.data,
      moviesDataState: moviesData.data,
      showInfo: true,
    });
    console.log("showInfo is = ", this.showInfo);
    // console.log("weatherDataState = ", this.state.weatherDataState);
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
        <Main mapUrl={this.state.mapUrl} weatherDataState={this.state.weatherDataState} moviesDataState={this.state.moviesDataState}showInfo={this.state.showInfo} cityObj={this.state.cityObj} selectCity={this.selectCity} />

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
