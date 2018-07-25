import React, { Component } from "react";
import * as Scroll from "react-scroll/modules";
import { Link } from "react-router-dom";
// Redux
import { compose } from "redux";
import { connect } from "react-redux";
// actions
import {
  actFetchTripContent,
  actAddComment,
  actDeleteComment,
  actRateTrip
} from "../actions/trip";
import { uiReducer, activeIndexReducer } from "./stateReducer/tripReducer";
// utils
import isEmpty from "../utils/isEmpty";
import { color } from "../theme/color";
// HOC
import withFadeOnMount from "../HOComponent/fadeOnMount";
import Drop from "../HOComponent/DropTransitionGroup";
// Comp
import Header from "../components/header/Header";
import Overview from "../components/trippage/Overview";
import Gallery from "../components/trippage/OverviewGallery";
import Book from "../components/trippage/Book";
import Footer from "../components/footer/Footer";
import Section from "../components/common/section/Section";
import Navbar from "../components/navbar/Navbar";
import { Container, Row, Col } from "../theme/style";
import OverviewCommentForm from "../components/trippage/OverviewCommentForm";

const overviewNav = ["Overview", "Guide", "Review", "Gallery", "Book"];

export class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      ui: {
        fixedLayout: false,
        fixedBook: false
      },
      tripContent: null
    };
    this.section = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.tripContent) {
      if (this.props.tripContent._id !== this.props.match.params.tripId)
        this.props.actFetchTripContent(this.props.match.params.tripId);
    }
    window.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onSubmit = data => {
    const { auth } = this.props;
    this.props.actAddComment(this.props.match.params.tripId, {
      userId: auth.id,
      text: data
    });
  };

  onScroll = () => {
    this.onChangeUI();
    this.onHighlightNav();
  };

  onAnimatedScroll = offsetHeight => {
    Scroll.animateScroll.scrollTo(offsetHeight, {
      duration: 500
    });
  };

  onScrollToFlag = flagIndex => {
    this.section.scrollToFlag(flagIndex, 120);
  };

  onChangeUI = () => {
    const { overview } = this.section.getFlagsPosition();
    const { mainNav } = this.section.getFlagsOffSet();
    const { fixedLayout, fixedBook } = this.state.ui;
    const condition = {
      windowWidth: window.innerWidth,
      uiPosition: overview.top - mainNav.offsetHeight - 60,
      fixedBook,
      fixedLayout
    };
    const changes = uiReducer(this.state.ui, condition);
    if (JSON.stringify(changes) !== JSON.stringify(this.state.ui)) {
      this.setState({ ui: changes });
    }
  };
  onHighlightNav = () => {
    const positions = this.section.getFlagsPosition();
    const { mainNav, subNav } = this.section.getFlagsOffSet();
    const top = mainNav.offsetHeight + subNav.offsetHeight;
    const changes = activeIndexReducer(this.state.activeIndex, positions, top);
    if (this.state.activeIndex !== changes) {
      this.setState({ activeIndex: changes });
    }
  };

  onDeleteComment = commentId => {
    const data = {
      commentId,
      userId: this.props.auth.id
    };
    this.props.actDeleteComment(this.props.match.params.tripId, data);
  };
  onRating = rate => {
    this.props.actRateTrip(
      this.props.auth.id,
      this.props.match.params.tripId,
      rate
    );
  };

  render() {
    const { fixedLayout, fixedBook } = this.state.ui;
    const {
      auth,
      addCommentIsLoading,
      rateTripIsLoading,
      deleteCommentIsLoading,
      error
    } = this.props;
    const {
      headerImageUrl,
      pricePerDay,
      pricePerPerson,
      rating,
      reviews,
      title,
      tripContent
    } = this.props.tripContent;
    let gallery = [];
    if (tripContent) {
      gallery = tripContent.gallery;
    }
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
                    active={index === this.state.activeIndex}
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
                    active={index === this.state.activeIndex}
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
                    <Overview.Review
                      loading={rateTripIsLoading}
                      onClick={this.onRating}
                      rating={rating === undefined ? [] : rating}
                    />
                    <h3 style={{ fontSize: "2.5rem" }}>Comment</h3>
                    {/* Comment form */}
                    {!isEmpty(this.props.auth) && (
                      <OverviewCommentForm
                        auth={this.props.auth}
                        onSubmit={this.onSubmit}
                        loading={addCommentIsLoading}
                        inValid={!isEmpty(error.text) && error.text}
                      />
                    )}
                    {/* Comment display */}
                    {reviews && reviews.length !== 0 ? (
                      <Drop>
                        {reviews.map((ele, index) => (
                          <Overview.Comment
                            key={ele._id}
                            comments={ele}
                            auth={auth}
                            onClick={this.onDeleteComment}
                            loading={deleteCommentIsLoading}
                          />
                        ))}
                      </Drop>
                    ) : (
                      <Drop>
                        <p style={{ fontSize: "1.6rem" }}>No comment yet</p>
                      </Drop>
                    )}
                    {/* Gallery */}
                    <Section.Flag flagName="3" />
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
                            width: "min-content"
                          }
                        : {}
                    }
                    flagName="book"
                  >
                    <Book
                      pricePerDay={pricePerDay}
                      pricePerPerson={pricePerPerson}
                      params={this.props.match.params}
                    />
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
  auth: state.auth,
  addCommentIsLoading: state.loading.addCommentIsLoading,
  deleteCommentIsLoading: state.loading.deleteCommentIsLoading,
  rateTripIsLoading: state.loading.rateTripIsLoading,
  error: state.error
});

const mapDispatchToProps = {
  actFetchTripContent,
  actAddComment,
  actDeleteComment,
  actRateTrip
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFadeOnMount
)(TripPage);
