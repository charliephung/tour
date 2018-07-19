import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Scroll from "react-scroll/modules";
import { Link } from "react-router-dom";
// Redux
import { compose } from "redux";
import { connect } from "react-redux";
// actions
import { actFetchTripContent } from "../actions/trip";
// utils
import isEmpty from "../utils/isEmpty";
import { color } from "../theme/color";
// HOC
import withFadeOnMount from "../HOComponent/fadeOnMount";
// Comp
import Header from "../components/header/Header";
import Overview from "../components/trippage/Overview";
import Gallery from "../components/trippage/OverviewGallery";
import Book from "../components/trippage/Book";
import Footer from "../components/footer/Footer";
import Section from "../components/common/section/Section";
import Navbar from "../components/navbar/Navbar";
import { Container, Row, Col } from "../theme/style";

const overviewNav = ["Overview", "Guide", "Review", "Gallery", "Book"];

export class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewingContent: {
        view: "overview"
      },
      fixedLayout: false,
      fixedBook: false,
      tripContent: null
    };
    this.section = React.createRef();
  }

  componentDidMount() {
    if (this.props.tripContent) {
      if (this.props.tripContent._id !== this.props.match.params.tripId)
        this.props.actFetchTripContent(this.props.match.params.tripId);
    }
    window.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    this.onShowSubNavBar();
  };

  onAnimatedScroll = offsetHeight => {
    Scroll.animateScroll.scrollTo(offsetHeight, {
      duration: 500
    });
  };

  onScrollToFlag = flagIndex => {
    this.section.scrollToFlag(flagIndex, 120);
  };

  onShowSubNavBar = () => {
    const { overview } = this.section.getFlagsPosition();
    const { mainNav } = this.section.getFlagsOffSet();
    const { fixedLayout, fixedBook } = this.state;
    if (window.innerWidth < 1000) {
      if (fixedBook === true) {
        this.setState({ fixedBook: false });
      }
      if (
        overview.top - mainNav.offsetHeight - 60 < 0 &&
        fixedLayout === false
      ) {
        this.setState({ fixedLayout: true });
      }
      if (
        overview.top - mainNav.offsetHeight - 60 > 0 &&
        fixedLayout === true
      ) {
        this.setState({ fixedLayout: false });
      }
    } else if (window.innerWidth > 1000) {
      if (
        overview.top - mainNav.offsetHeight - 60 < 0 &&
        fixedLayout === false
      ) {
        this.setState({ fixedLayout: true, fixedBook: true });
      }
      if (
        overview.top - mainNav.offsetHeight - 60 > 0 &&
        fixedLayout === true
      ) {
        this.setState({ fixedLayout: false, fixedBook: false });
      }
    }
  };

  render() {
    const { fixedLayout, fixedBook } = this.state;

    const {
      headerImageUrl,
      pricePerDay,
      pricePerPerson,
      rating,
      reviews,
      title,
      tripContent,
      gallery
    } = this.props.tripContent;
    return (
      <React.Fragment>
        <Section onRef={ref => (this.section = ref)}>
          <Section.Flag
            style={{
              position: "fixed",
              zIndex: "900",
              display: "flex",
              width: "100%"
            }}
            flagName="mainNav"
          >
            <Navbar
              theme={{
                borderBottom: `1px solid ${color.grey}`,
                bgHoverColor: color.veryLightGrey,
                display: "flex"
              }}
              auth={this.props.auth}
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
          </Section.Flag>
          {/* SubNav */}
          <Section.Flag
            style={{
              transition: "all .2s",
              position: "fixed",
              zIndex: "800",
              top: `${
                fixedLayout
                  ? this.section.getFlagsOffSet().mainNav.offsetHeight + "px"
                  : "0px"
              }`,
              width: "100%"
            }}
            flagName="subNav"
          >
            <Navbar
              theme={{
                borderBottom: `1px solid ${color.grey}`,
                bgHoverColor: color.veryLightGrey,
                ItemBgColor: color.orange
              }}
            >
              <Navbar.List>
                {overviewNav.map((ele, index) => (
                  <Navbar.Item
                    key={index}
                    value={index}
                    active={0}
                    onClick={e => this.onScrollToFlag(e.target.value)}
                  >
                    {ele}
                  </Navbar.Item>
                ))}
              </Navbar.List>
            </Navbar>
          </Section.Flag>
          {/* Header */}
          <Header
            heading={title}
            button={false}
            renderImage={() => (
              <Header.Image active={true} imageUrl={headerImageUrl} />
            )}
          >
            <Header.Heading>{title}</Header.Heading>
          </Header>
          {/* Content */}
          <Container>
            {/* Overview  nav*/}
            <Navbar
              theme={{
                bgHoverColor: color.veryLightGrey,
                ItemBgColor: color.orange
              }}
            >
              <Navbar.List>
                {overviewNav.map((ele, index) => (
                  <Navbar.Item
                    key={index}
                    value={index}
                    active={0}
                    onClick={e => this.onScrollToFlag(e.target.value)}
                  >
                    {ele}
                  </Navbar.Item>
                ))}
              </Navbar.List>
            </Navbar>

            {/* Overview */}
            <Section.Flag flagName="overview">
              <Row theme={{ display: "flex" }}>
                <Col theme={{ col: "70%", padding: "0 2rem" }}>
                  <Overview>
                    <Section.Flag flagName="0" />
                    {/* Overview main text */}
                    <Overview.Content
                      title="Overview"
                      text={tripContent && tripContent.overview}
                    />
                    <Section.Flag flagName="1" />
                    {/* Guide */}
                    <Overview.Content
                      title="Guide"
                      text={tripContent && tripContent.itinerary}
                    />
                    {/* Review and comments */}
                    <Section.Flag flagName="2" />
                    <Overview.Review />
                    <Section.Flag flagName="3" />
                    <Overview.Comment />
                    {/* Gallery */}
                    <Gallery images={gallery} />
                  </Overview>
                </Col>
                <Col theme={{ col: "30%" }}>
                  {/* Booking */}
                  <Section.Flag flagName="4" />
                  <Section.Flag
                    style={
                      fixedBook
                        ? {
                            position: "fixed",
                            top: `${this.section.getFlagsOffSet().mainNav
                              .offsetHeight +
                              this.section.getFlagsOffSet().subNav
                                .offsetHeight +
                              10}px`,
                            width: "fit-content"
                          }
                        : {}
                    }
                    flagName="book"
                  >
                    <Book />
                  </Section.Flag>
                </Col>
              </Row>
            </Section.Flag>
          </Container>

          <Footer />
        </Section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tripContent: state.tripContent,
  auth: state.auth
});

const mapDispatchToProps = {
  actFetchTripContent
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFadeOnMount
)(TripPage);
