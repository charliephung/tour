import React, { Component } from "react";
import { FormGroup } from "../form/authForm/AuthForm.style";
import { Row, Button, Textarea } from "../../theme/style";
import { color } from "../../theme/color";

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
    const { auth, loading, inValid } = this.props;
    const { text } = this.state;
    const style = inValid
      ? {
          resize: "vertical",
          height: "200px",
          maxHeight: "200px",
          border: "1px solid red"
        }
      : {
          resize: "vertical",
          height: "200px",
          maxHeight: "200px"
        };

    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <div style={{ display: "flex" }}>
            <img style={{ height: "60px" }} src={auth.avatar} alt="" />
            <Row>
              <Textarea
                style={style}
                name="text"
                value={text}
                onChange={this.onChange}
              />
              {inValid && (
                <p
                  style={{
                    color: "red",
                    fontSize: "1.5rem"
                  }}
                >
                  {inValid}
                </p>
              )}

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
