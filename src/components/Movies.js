import React from "react";
import MovieCard from "./MovieCard";



class Movies extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Movies" style={{ width: "55.45vw", height: "53vh", marginBottom: "3vh", position: "absolute", right: "3vh", bottom: "3vh", opacity: "0.75",overflowY: "auto"}}>

          <MovieCard moviesDataState={this.props.moviesDataState} />
      </div>
    );
  }
}

export default Movies;
