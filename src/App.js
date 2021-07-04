import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

class App extends React.Component {
  selectCity(e) {
    e.preventDefault;
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Main selectCity={this.selectCity}/>
        <Footer />
      </div>
    );
  }
}

export default App;
