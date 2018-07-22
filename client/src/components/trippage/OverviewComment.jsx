import React, { Component } from "react";
import { FormGroup, Input } from "../form/authForm/AuthForm.style";
import { Row, Button } from "../../theme/style";
import { color } from "../../theme/color";

export class OverviewFormComment extends Component {
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
    const { auth } = this.props;
    const { text } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <div style={{ display: "flex" }}>
            <img style={{ height: "60px" }} src={auth.avatar} />
            <Input name="text" value={text} onChange={this.onChange} />
            <Button theme={{ bgColor: color.green }}>Submit</Button>
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default OverviewFormComment;
