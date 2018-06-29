import React, { Component } from "react";

export class Book extends Component {
  constructor(props) {
    super(props);

    this.bookForm = React.createRef();
  }

  render() {
    return (
      <section className="book" ref={this.bookForm}>
        <form className="book__body">
          <div className="book__form" style={this.props.style}>
            <input
              className="book__form__name"
              type="text"
              placeholder="Full name"
            />
            <input
              className="book__form__email"
              type="email"
              placeholder="Email"
            />
            <label htmlFor="start-date">Start Date</label>
            <input className="book__form__date" id="start-date" type="date" />
            <label htmlFor="people">People</label>
            <div className="book__form__people-group">
              <input className="book__form__people" id="people" type="text" />
              <span className="book__form__people__plus">+</span>
              <span className="book__form__people__minus">-</span>
            </div>
            <h3 className="heading-3">Total: $85</h3>
            <button className="btn btn--secondary btn--block">Book</button>
          </div>
        </form>
      </section>
    );
  }
}

export default Book;
