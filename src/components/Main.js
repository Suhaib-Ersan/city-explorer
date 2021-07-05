import React from "react";
import { Form } from "react-bootstrap/";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Main">
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select City:</Form.Label>
            <Form.Control as="select" custom onChange={this.props.selectCity}>
              <option value="Irbid">Irbid</option>
              <option value="Amman">Amman</option>
              <option value="Aqaba">Aqaba</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default Main;
