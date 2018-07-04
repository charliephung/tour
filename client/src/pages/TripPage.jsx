import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Scroll from "react-scroll";
// Comp
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Overview from "../components/trippage/Overview";
import { Book } from "../components/trippage/Book";
import Gallery from "../components/trippage/Gallery";
import OverviewSubNav from "../components/trippage/OverviewSubNav";
import { Header } from "../components/header/Header";
import { compose } from "redux";
import { connect } from "react-redux";
// HOC
import withFadeOnMount from "../HOComponent/fadeOnMount";
// CSS
import * as tripPageStyles from "./css/tripPageStyle";
// utils
import indexOfMin from "../utils/indexOfMin";
// actions
import { actFetchTripContent } from "../actions/trip";

const overviewText = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dignissimos eum eveniet obcaecati, a deserunt sint non debitis nulla ab reprehenderit explicabo similique officiis doloremque necessitatibus nesciunt ad, dolore reiciendis?

Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum odio aliquid et, earum aperiam placeat aut dignissimos dolore praesentium architecto accusamus veniam mollitia voluptatibus quisquam nam eveniet in vel dicta?
`;

const comment = [
  {
    userImageUrl: "https://randomuser.me/portraits/women/2.jpg",
    username: "Tom",
    date: "27/03/2018",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dignissimos eum eveniet obcaecati, a deserunt sint non debitis nulla ab reprehenderit explicabo similique officiis doloremque necessitatibus nesciunt ad, dolore reiciendis?

Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt.

Lor`
  },
  {
    userImageUrl: "https://randomuser.me/portraits/women/2.jpg",
    username: "Tom",
    date: "27/03/2018",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dignissimos eum eveniet obcaecati, a deserunt sint non debitis nulla ab reprehenderit explicabo similique officiis doloremque necessitatibus nesciunt ad, dolore reiciendis?

Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt.

Lor`
  },
  {
    userImageUrl: "https://randomuser.me/portraits/women/2.jpg",
    username: "Tom",
    date: "27/03/2018",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dignissimos eum eveniet obcaecati, a deserunt sint non debitis nulla ab reprehenderit explicabo similique officiis doloremque necessitatibus nesciunt ad, dolore reiciendis?

Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nihil odit alias exercitationem non animi excepturi dolor magni distinctio. Enim in temporibus sed quaerat impedit veniam fuga voluptate nam incidunt.

Lor`
  }
];

const gallery = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc40334a7838deb2c079a276fa78ac30&auto=format&fit=crop&w=500&q=60"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc40334a7838deb2c079a276fa78ac30&auto=format&fit=crop&w=500&q=60"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc40334a7838deb2c079a276fa78ac30&auto=format&fit=crop&w=500&q=60"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc40334a7838deb2c079a276fa78ac30&auto=format&fit=crop&w=500&q=60"
  }
];

export class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewNavStyle: tripPageStyles.overviewNavPreStyle,
      overviewNavListStyle: tripPageStyles.overviewNavListStyle,
      bookFormStyle: tripPageStyles.overviewNavListStyle,
      viewingContent: {
        view: "overview"
      }
    };
    this.overview = React.createRef();
    this.overviewNav = React.createRef();
    this.gallery = React.createRef();
    this.bookForm = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onChangeStyleByView = (top, stateField, style1, style2) => {
    if (top < 0) {
      // Only set state when fallback style is diff
      if (this.state[stateField] !== style1) {
        this.setState({
          [stateField]: style1
        });
      }
    } else {
      // Only set state when fallback style is diff
      if (this.state[stateField] !== style2) {
        this.setState({
          [stateField]: style2
        });
      }
    }
  };

  onScroll = e => {
    this.onViewContent();
    this.onSetOverviewNavBar();
    this.onSetBookForm();
  };

  onAnimatedScroll = offsetHeight => {
    Scroll.animateScroll.scrollTo(offsetHeight, {
      duration: 500
    });
  };

  onScrollToSession = e => {
    switch (e.target.value) {
      case 0:
        this.onAnimatedScroll(
          this.overview.getChildPosition().overview.offsetTop - 100
        );
        break;
      case 1:
        this.onAnimatedScroll(
          this.overview.getChildPosition().guide.offsetTop - 100
        );
        break;
      case 2:
        this.onAnimatedScroll(
          this.overview.getChildPosition().review.offsetTop - 100
        );
        break;
      case 3:
        this.onAnimatedScroll(
          this.gallery.current.props.getPosition("gallery").offsetTop - 100
        );
        break;
      default:
        break;
    }
  };

  onViewContent = () => {
    let viewingContent = {
      overview: this.overview.getChildDOMRect().overview.top,
      guide: this.overview.getChildDOMRect().guide.top,
      review: this.overview.getChildDOMRect().review.top,
      gallery: this.gallery.current.props.getDOMRect("gallery").top
    };
    const index = indexOfMin(Object.values(viewingContent), { absolute: true });
    // Only update when goto new session
    if (Object.keys(viewingContent)[index] !== this.state.viewingContent.view) {
      this.setState({
        viewingContent: {
          view: Object.keys(viewingContent)[index]
        }
      });
    }
  };

  onSetOverviewNavBar = () => {
    const overviewNavOffSetTop = this.overviewNav.current.getBoundingClientRect()
      .top;
    // Check if nav is out if wp
    this.onChangeStyleByView(
      overviewNavOffSetTop - 60,
      "overviewNavStyle",
      tripPageStyles.overviewNavStyle,
      tripPageStyles.overviewNavPreStyle
    );
    this.onChangeStyleByView(
      overviewNavOffSetTop - 60,
      "overviewNavListStyle",
      tripPageStyles.overviewNavListStyle,
      tripPageStyles.overviewNavListStyle
    );
    // Check if viewport width is lower than 1100
    if (
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <=
      1100
    ) {
      // Check if nav is out if wp
      this.onChangeStyleByView(
        overviewNavOffSetTop - 60,
        "overviewNavStyle",
        tripPageStyles.overviewNavStyleMedia,
        tripPageStyles.overviewNavPreStyle
      );
      this.onChangeStyleByView(
        overviewNavOffSetTop - 60,
        "overviewNavListStyle",
        tripPageStyles.overviewNavListStyleMedia,
        tripPageStyles.overviewNavListStyle
      );
    }
  };

  onSetBookForm = () => {
    // Check if bookform is out of wp then set style = fix or normal
    this.onChangeStyleByView(
      this.bookForm.current.bookForm.current.getBoundingClientRect().top - 111,
      "bookFormStyle",
      tripPageStyles.bookFormStyle,
      null
    );
    if (
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <=
      1100
    ) {
      if (this.state.bookFormStyle !== null) {
        this.setState({ bookFormStyle: null });
      }
    }
  };

  render() {
    return (
      <div className="container">
        {/* Navbar */}
        <NavBar
          navStyle={tripPageStyles.NavBarStyles}
          navListStyle={tripPageStyles.NavBarListStyles}
        />
        {/* Sub nav */}
        <OverviewSubNav
          viewingContent={this.state.viewingContent.view}
          overviewNavStyle={this.state.overviewNavStyle}
          overviewNavListStyle={this.state.overviewNavListStyle}
          onScrollToSession={this.onScrollToSession}
        />
        {/* Header */}
        <header className="header">
          <div
            className="header__image"
            style={{
              backgroundImage: `linear-gradient(rgba(20, 30, 48, 0.6), rgba(36, 59, 85, 0.6)), url(${
                gallery[0].imageUrl
              }`
            }}
          />
          <h1 className="header__heading heading-1">Someware ADVENTURE</h1>
        </header>
        {/* Content */}
        <div className="sub-container">
          {/* Overview  nav*/}
          <section ref={this.overviewNav} className="overview">
            <div className="overview__nav">
              <ul className="overview__list">
                <li
                  value="0"
                  onClick={this.onScrollToSession}
                  className="overview__list-item 
                 active"
                >
                  Overview
                </li>
                <li
                  value="1"
                  onClick={this.onScrollToSession}
                  className="overview__list-item"
                >
                  Guide
                </li>
                <li
                  value="2"
                  onClick={this.onScrollToSession}
                  className="overview__list-item"
                >
                  Review
                </li>
                <li
                  value="3"
                  onClick={this.onScrollToSession}
                  className="overview__list-item"
                >
                  Gallery
                </li>
              </ul>
            </div>
          </section>
          {/* Overview */}
          <Overview
            onRef={ref => (this.overview = ref)}
            content={overviewText}
            guide={overviewText}
            rating={4}
            comments={comment}
            totalReviews={100}
          />
          {/* Booking */}

          <Book ref={this.bookForm} style={this.state.bookFormStyle} />

          {/* Gallery */}
          <Gallery images={gallery} ref={this.gallery} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = {
  actFetchTripContent
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withFadeOnMount
)(TripPage);
