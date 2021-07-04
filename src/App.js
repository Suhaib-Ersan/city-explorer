import React from "react";
import "./App.css";

import Header from "./components/Header"
import Main from "./components/Main";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityObj: {},
      mapVisible: false,
    };
  }
  selectCity = async (event) => {
    event.preventDefault();

    let locationIqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${event.target.value}&format=json`;
    let resData = await axios.get(locationIqUrl);

    this.setState({
      cityObj: resData[1],
      mapVisible: true,
    })
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Main selectCity={this.selectCity} />
        <div>City Name: {this.state.cityObj.display_name},{this.state.cityObj.lat},{this.state.cityObj.lon}</div>
        
      </div>
    );
  }
}

export default App;
