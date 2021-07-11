import React from "react";

import { Form, Card, Button } from "react-bootstrap/";
import Weather from "./weather";
import Movies from "./Movies";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Main">
        <Card className="cardsContainer" style={{ width: "85vw", height: "80vh", borderRadius:"1.5rem" }}>
          <Card className="mapCardBody" style={{ width: "25vw", height: "74vh", marginTop: "3vh", position:"absolute",left: "3vh" }}>
            <div className="d-flex flex-column justify-content-center" style={{ height: "100%"}}> 
              <Card.Body>
                <Form onSubmit={this.props.selectCity}>
                  <Form.Group className="mb-3">
                    <Form.Label>Check a city</Form.Label>
                    <Form.Control type="text" placeholder="City Name" name="city" />
                  </Form.Group>
                  <Button variant="primary" type="submit" block className="submitButton">
                    Search
                  </Button>
                </Form>
                {this.props.showInfo && (
                  <div className="cityInfoContainer">
                    <div>City Name: {this.props.cityObj.display_name}</div>
                    <div>Lat: {this.props.cityObj.lat}</div>
                    <div>Lon: {this.props.cityObj.lon}</div>
                  </div>
                )}

                
                {/* <Card.Text>Check out any country/city/county..etc you want.</Card.Text> */}
              </Card.Body>
              <Card.Img variant="bottom" src={this.props.mapUrl} />
            </div>
          </Card>
          {this.props.showInfo && <Weather weatherDataState={this.props.weatherDataState} />}
          {this.props.showInfo && <Movies moviesDataState={this.props.moviesDataState} />}
        </Card>
      </div>
    );
  }
}

export default Main;
