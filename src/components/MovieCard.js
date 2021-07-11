import React from "react";
import { Card } from "react-bootstrap/";

import Row from 'react-bootstrap/Row'

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MovieCard">
        <Row md={5} style={{gap: "0.1rem"}}>
          {this.props.moviesDataState.map((ele, idx) => {
            return (
              <>
                <Card style={{ width: "12rem" }}>
                  <Card.Img variant="top" src={ele.poster_path} style={{ maxHeight: "14rem", overflow: "hidden", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      {ele.title} -{" "}
                      {() => {
                        return ele.release_date.split("-")[0];
                      }}{" "}
                      {ele.avgVotes} /10
                    </Card.Title>
                    <Card.Text style={{ maxHeight: "6rem", overflow: "auto" }}>{ele.overview}</Card.Text>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default MovieCard;
