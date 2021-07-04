import React from "react";
import { Form, Button } from "react-bootstrap/";

class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <Form>
          <Form.Label>Select City</Form.Label>
          <Form.Control as="select" onChange={this.props.selectCity}>
            <option value="Irbid">Irbid</option>
            <option value="Amman">Amman</option>            
            <option value="Aqaba">Aqaba</option>
          </Form.Control>
        </Form>
      </div>
    );
  }
}
export default Main;
