import React, { Component } from "react";
import { FormGroup, Input } from "../form/authForm/AuthForm.style";
import { Row, Button, Textarea } from "../../theme/style";
import { color } from "../../theme/color";
import Roler from "../animation/Roler";

export class OverviewCommentForm extends Component {
  state = { text: "" };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { auth, loading } = this.props;
    const { text } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <div style={{ display: "flex" }}>
            <img style={{ height: "60px" }} src={auth.avatar} />
            <Row>
              <Textarea
                style={{
                  resize: "vertical",
                  height: "200px",
                  maxHeight: "200px"
                }}
                name="text"
                value={text}
                onChange={this.onChange}
              />

              <Button theme={{ bgColor: color.green }}>
                {loading ? "......." : "Submit"}
              </Button>
            </Row>
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default OverviewCommentForm;
