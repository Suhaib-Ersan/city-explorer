import React from "react";
import { Card, Container, Row } from "react-bootstrap/";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MovieCard">
        <Container fluid>
          <Row>
            {this.props.moviesDataState.map((ele, idx) => {
              return (
                <>
                  <Card style={{ width: "12rem", }}>
                    <Card.Img variant="top" src={ele.poster_path} style={{ maxHeight: "24rem", overflow: "hidden", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "1rem" }}>
                        {ele.title} -{" "}
                        {() => {
                          return ele.release_date.split("-")[0];
                        }}{" "}
                        {ele.avgVotes} /10
                      </Card.Title>
                      <Card.Text style={{ height: "6rem", overflow: "auto" }}>{ele.overview}</Card.Text>
                    </Card.Body>
                  </Card>
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default MovieCard;
