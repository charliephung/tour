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
import NotFoundCard from "../components/homepage/FeatureTripNotFound";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import withFadeOnMout from "../HOComponent/fadeOnMount";
import FeatureTrip from "../components/homepage/FeatureTrip";
import { Button, Container, Col, Row, Text } from "../theme/style";

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
  "sai gon": "sai gon",
  "da lat": "da lat",
  "ha noi": "ha noi"
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
    activeLink: "sai gon",
    headerImage: 0
  };

  onChangeFeatureTrip = e => {
    this.onChangeLink(e);
    // Check if trips are already fetched
    const index = this.props.trips.findIndex(ele => ele.location === e);
    // fetched data when not found
    index === -1 && this.props.actFetchTrips(e);
  };

  onChangeLink = e => {
    this.setState(state => {
      if (state.activeLink !== e) {
        return { activeLink: e };
      }
    });
  };

  componentWillMount() {
    window.scrollTo(0, 0);
    // Fetch init data
    if (this.props.trips.length === 0) {
      this.props.actFetchTrips("sai gon");
    }
  }

  renderCard = loading => (
    <React.Fragment>
      <NotFoundCard loading={loading} />
      <NotFoundCard loading={loading} />
      <NotFoundCard loading={loading} />
      <NotFoundCard loading={loading} />
    </React.Fragment>
  );

  render() {
    let tripContent = this.renderCard(true);
    const { trips, loading } = this.props;
    const { activeLink } = this.state;
    const tripIndex = trips.findIndex(trip => trip.location === activeLink);
    if (!loading && trips[tripIndex].trips.length === 0) {
      tripContent = this.renderCard();
    }
    if (!loading && trips[tripIndex].trips.length !== 0) {
      tripContent = trips[tripIndex].trips.map((ele, index) => {
        return (
          <Link key={index} to={`trip/${ele.title}/${ele._id}`}>
            <FeatureTrip trip={ele} />
          </Link>
        );
      });
    }

    const { auth } = this.props;
    return (
      <React.Fragment>
        {/* Nav */}
        <Navbar
          theme={{
            borderBottom: `1px solid ${color.grey}`,
            bgHoverColor: color.veryLightGrey,
            position: "fixed",
            zIndex: "900",
            display: "flex"
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
        <Header
          headerImage={headerImage}
          renderImage={(imageArr, activeIndex) =>
            imageArr.map((ele, index) => (
              <Header.Image
                key={index}
                active={activeIndex === index}
                imageUrl={ele.imageUrl}
              />
            ))
          }
        >
          <Header.Heading>Experience in VietNam</Header.Heading>
          <Button theme={{ bgColor: color.orange, width: "20%" }}>
            Show more
          </Button>
        </Header>
        {/* Card F */}
        <br />
        <br />
        <br />
        <br />
        <Container
          theme={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          {cardContent.map((ele, index) => (
            <FeatureCard
              key={index}
              icon={ele.icon}
              heading={ele.heading}
              text={ele.text}
            />
          ))}
        </Container>
        {/* Trips */}
        <Container>
          <h3
            style={{
              fontSize: "6rem",
              textAlign: "center",
              paddingTop: "9rem"
            }}
          >
            Our Featured Trips
          </h3>
          <Navbar
            theme={{
              ItemBgColor: color.grey,
              bgHoverColor: color.lightGrey,
              hoverColor: "white",
              fontSize: "2.5rem"
            }}
          >
            <Navbar.List style={{ justifyContent: "center" }}>
              {tripNav.map((ele, index) => (
                <Navbar.Item
                  key={index}
                  onClick={() =>
                    this.onChangeFeatureTrip(ele.heading.toLowerCase())
                  }
                  value={index}
                  theme={
                    this.state.activeLink === index
                      ? { beforeWidth: "65%" }
                      : null
                  }
                >
                  {ele.heading}
                </Navbar.Item>
              ))}
            </Navbar.List>
          </Navbar>
        </Container>
        <Container
          theme={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          {tripContent}
        </Container>
        <Row theme={{ padding: "12rem 0", background: color.veryLightGrey }}>
          <Container>
            <h3
              style={{
                fontSize: "6rem",
                textAlign: "center",
                padding: "5rem"
              }}
            >
              “Amazing experience”
            </h3>
            <Row theme={{ display: "flex" }}>
              <Col
                theme={{
                  col: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 4rem"
                }}
              >
                <Text theme={{ fontSize: "2rem" }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
                  dolorem eos eligendi eveniet facere tempore est quaerat quia,
                  omnis adipisci voluptatibus veniam, in error distinctio
                  sapiente eius et impedit. Praesentium. Lorem ipsum dolor, sit
                  amet consectetur adipisicing elit. Sed, dolorem eos eligendi
                  eveniet facere tempore est quaerat quia, omnis adipisci
                  voluptatibus veniam, in error distinctio sapiente eius et
                  impedit. Praesentium. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Sed, dolorem eos eligendi eveniet facere
                  tempore est quaerat quia, omnis adipisci voluptatibus veniam,
                  in error distinctio sapiente eius et impedit. Praesentium.
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
                  dolorem eos eligendi eveniet facere tempore est quaerat quia,
                  omnis adipisci voluptatibus veniam, in error distinctio
                  sapiente eius et impedit. Praesentium.
                </Text>
              </Col>
              <Col theme={{ col: "50%" }}>
                <img
                  style={{ width: "100%", padding: "0 4rem" }}
                  src="https://images.unsplash.com/photo-1511198384845-3f4e85bfe1c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14c21dc56ff09ea30bc9cd301e8875d3&auto=format&fit=crop&w=1351&q=80"
                  alt="image"
                />
              </Col>
            </Row>
          </Container>
        </Row>

        <Footer />
      </React.Fragment>
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
