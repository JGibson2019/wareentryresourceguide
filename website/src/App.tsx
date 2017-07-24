import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { Organization} from "./Organization";

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
      <Grid>
        <Row>
          <Col sm={12} md={12}>
            <Organization name="My Organization" email="this.email@server.com"/>
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

export default App;
