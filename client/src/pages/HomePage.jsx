import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// Actions
import { actFetchTrips } from "../actions/trip";
import { actLoadingStart, actLoadingEnd } from "../actions/async";
// Ulti
import isEmpty from "../utils/isEmpty";
import { color } from "../theme/color";
// Component
import FeatureCard from "../components/homepage/FeatureCard";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeaderImage from "../components/homepage/HeaderImage";
import Navbar from "../components/navbar/Navbar";
import withFadeOnMout from "../HOComponent/fadeOnMount";
import FeatureTrip from "../components/homepage/FeatureTrip";

// feature card
const cardContent = [
  {
    icon: "fas fa-home",
    heading: "Stay with local",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugit est
          dolores fugiat illum natus labore. Facere blanditiis`
  },
  {
    icon: "fas fa-camera-retro",
    heading: "Explore our culture",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugit est
          dolores fugiat illum natus labore. Facere blanditiis`
  },
  {
    icon: "fas fa-utensils",
    heading: "Eat amazing food",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugit est
          dolores fugiat illum natus labore. Facere blanditiis`
  },
  {
    icon: "far fa-comments",
    heading: "Share real experiences",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugit est
          dolores fugiat illum natus labore. Facere blanditiis`
  }
];
const headerImage = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-0.3.5…EyMDd9&s=ec23000…&auto=format&fit=crop&w=1350&q=80"
  },
  {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Langco.jpg/1200px-Langco.jpg"
  },
  {
    imageUrl:
      "https://static.lantoa.net/wp-content/uploads/2018/04/12111220/1200px-Tatev_Monastery_Armenia.jpg"
  }
];
const lookupLocation = {
  0: "sai gon",
  1: "da lat",
  2: "ha noi"
};
// Trip nav
const tripNav = [
  {
    heading: "Sai Gon"
  },
  {
    heading: "Da Lat"
  },
  {
    heading: "Ha Noi"
  }
];

export class HomePage extends Component {
  static propTypes = {
    actFetchTrips: PropTypes.func.isRequired
  };
  state = {
    activeLink: 0,
    headerImage: 0
  };

  onChangeFeatureTrip = e => {
    this.onChangeLink(e);
    const { value } = e.target;
    // Check if trips are already fetched
    const index = this.props.trips.findIndex(
      ele => ele.location === lookupLocation[value]
    );
    // fetched data when not found
    index === -1 && this.props.actFetchTrips(lookupLocation[value]);
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.trips.length !== 0) {
      if (nextProps.trips === this.state.trips) return false;
    }
    return true;
  }

  onChangeLink = e => {
    const { value } = e.target;
    this.setState(state => {
      if (state.activeLink !== value) {
        return { activeLink: value };
      }
    });
  };

  componentDidMount() {
    // Fetch init data
    this.props.actFetchTrips("sai gon");
  }

  render() {
    let tripContent = null;
    const { trips, loading } = this.props;
    const { activeLink } = this.state;

    if (loading && trips.length === 0) {
      tripContent = <h1>Loading</h1>;
    }
    if (!loading && trips[activeLink].trips.length === 0) {
      tripContent = <h1>Not Found</h1>;
    }
    if (!loading && trips[activeLink].trips.length !== 0) {
      tripContent = trips[activeLink].trips.map((ele, index) => {
        return <FeatureTrip key={index} trip={ele} />;
      });
    }

    // if (this.state.trips === null) tripContent = <h1>loading</h1>;
    // if (this.state.trips && this.state.trips.length === 0)
    //   tripContent = <h1>NotFound</h1>;
    // if (this.state.trips && this.state.trips.length !== 0) {
    //   if (this.state.trips[this.state.activeLink].trips.length === 0) {
    //     tripContent = <h1>NotFound</h1>;
    //   } else {
    //     const tripsInLocation = this.state.trips[this.state.activeLink];
    //     tripContent = tripsInLocation.trips.map((ele, index) => {
    //       return <FeatureTrip key={index} trip={ele} />;
    //     });
    //   }
    // }

    const { auth } = this.props;
    return (
      <div className="container">
        {/* Nav */}

        <Navbar
          theme={{
            borderBottom: `1px solid ${color.grey}`,
            bgHoverColor: color.lightGrey
          }}
          auth={auth}
        >
          <Navbar.List>
            <Navbar.Item>
              <Link to="/">
                <h3>Tour</h3>
              </Link>
            </Navbar.Item>
          </Navbar.List>
          <Navbar.List style={{ marginLeft: "auto" }}>
            <Navbar.AuthNav />
          </Navbar.List>
        </Navbar>
        {/* Header */}
        <Header headerImage={headerImage}>
          {(imageArr, activeIndex) =>
            imageArr.map((ele, index) => (
              <HeaderImage
                key={index}
                active={activeIndex === index}
                imageUrl={ele.imageUrl}
              />
            ))
          }
        </Header>
        {/* Card F */}
        <section className="feature">
          {cardContent.map((ele, index) => (
            <FeatureCard
              key={index}
              icon={ele.icon}
              heading={ele.heading}
              text={ele.text}
            />
          ))}
        </section>
        {/* Trips */}
        <section className="feature-trip">
          <h3 className="heading-2">Our Featured Trips</h3>
          {/* Trip Nav */}
          <nav className="feature-trip__nav">
            <ul className="feature-trip__list">
              {tripNav.map((ele, index) => (
                <li
                  key={index}
                  onClick={this.onChangeFeatureTrip}
                  value={index}
                  className={
                    this.state.activeLink === index
                      ? `feature-trip__list-item feature-trip__list-item--active`
                      : "feature-trip__list-item"
                  }
                >
                  {ele.heading}
                </li>
              ))}
            </ul>
          </nav>
          {tripContent}
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
  loading: state.loading.fetchTripsIsLoading,
  auth: state.auth
});

const mapDispatchToProps = {
  actFetchTrips,
  actLoadingStart,
  actLoadingEnd
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFadeOnMout
)(HomePage);
