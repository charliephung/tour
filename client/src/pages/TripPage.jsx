import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Scroll from "react-scroll";
// Redux
import { compose } from "redux";
import { connect } from "react-redux";
// Comp
import NavBar from "../components/navbar/NavBar";
import Header from "../components/header/Header";
import HeaderImage from "../components/homepage/HeaderImage";
import Overview from "../components/trippage/Overview";
import OverviewNav from "../components/trippage/OverviewNav";
import OverviewNavListItem from "../components/trippage/OverviewNavListItem";
import OverviewSubNav from "../components/trippage/OverviewSubNav";
import OverviewContent from "../components/trippage/OverviewContent";
import OverviewGuide from "../components/trippage/OverviewGuide";
import OverviewReview from "../components/trippage/OverviewReview";
import OverviewComment from "../components/trippage/OverviewComment";
import Gallery from "../components/trippage/OverviewGallery";
import Book from "../components/trippage/Book";
import Footer from "../components/footer/Footer";
// HOC
import withFadeOnMount from "../HOComponent/fadeOnMount";
// CSS
import {
  overviewNavPreStyle,
  overviewNavListStyle,
  overviewNavStyle,
  overviewNavStyleMedia,
  overviewNavListStyleMedia,
  bookFormStyle,
  NavBarStyles,
  NavBarListStyles
} from "./css/tripPageStyle";
// actions
import { actFetchTripContent } from "../actions/trip";
import isEmpty from "../utils/isEmpty";

export class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewNavStyle: overviewNavPreStyle,
      overviewNavListStyle: overviewNavListStyle,
      bookFormStyle: overviewNavListStyle,
      viewingContent: {
        view: "overview"
      },
      tripContent: null
    };
    this.overview = React.createRef();
    this.content = React.createRef();
    this.guide = React.createRef();
    this.review = React.createRef();
    this.comment = React.createRef();
    this.overviewNav = React.createRef();
    this.gallery = React.createRef();
    this.bookForm = React.createRef();
  }

  componentDidMount() {
    this.props.actFetchTripContent(this.props.match.params.tripId);

    window.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onToggleStyle = (ceiling, stateField, preStyle, nextStyle) => {
    if (ceiling < 0) {
      // Only set state when fallback style is diff
      if (this.state[stateField] !== preStyle) {
        this.setState({
          [stateField]: preStyle
        });
      }
    } else {
      // Only set state when fallback style is diff
      if (this.state[stateField] !== nextStyle) {
        this.setState({
          [stateField]: nextStyle
        });
      }
    }
  };

  onScroll = () => {
    // this.onViewContent();
    this.onSetOverviewNavBar();
    // this.onSetBookForm();
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
          this.overview.getChildrenOffset().OverviewContent.offsetTop - 100
        );
        break;
      case 1:
        this.onAnimatedScroll(
          this.overview.getChildrenOffset().OverviewGuide.offsetTop - 100
        );
        break;
      case 2:
        this.onAnimatedScroll(
          this.overview.getChildrenOffset().OverviewReview.offsetTop - 100
        );
        break;
      case 3:
        this.onAnimatedScroll(
          this.overview.getChildrenOffset().OverviewGallery.offsetTop - 100
        );
        break;
      default:
        break;
    }
  };

  // onViewContent = () => {
  //   let viewingContent = {
  //     overview: this.overview.getChildDOMRect().overview.top,
  //     guide: this.overview.getChildDOMRect().guide.top,
  //     review: this.overview.getChildDOMRect().review.top,
  //     gallery: this.gallery.current.props.getDOMRect("gallery").top
  //   };
  //   const index = indexOfMin(Object.values(viewingContent), { absolute: true });
  //   // Only update when goto new session
  //   if (Object.keys(viewingContent)[index] !== this.state.viewingContent.view) {
  //     this.setState({
  //       viewingContent: {
  //         view: Object.keys(viewingContent)[index]
  //       }
  //     });
  //   }
  // };

  onSetOverviewNavBar = () => {
    // console.log(this.overview.getChildrenPosition().OverviewContent.top - 60);

    const overviewNavOffSetTop =
      this.overview.getChildrenPosition().OverviewContent.top - 60;
    // Check if nav is out if wp
    this.onToggleStyle(
      overviewNavOffSetTop,
      "overviewNavStyle",
      overviewNavStyle,
      overviewNavPreStyle
    );
    this.onToggleStyle(
      overviewNavOffSetTop,
      "overviewNavListStyle",
      overviewNavListStyle,
      overviewNavListStyle
    );
    // // Check if viewport width is lower than 1100
    // if (
    //   Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <=
    //   1100
    // ) {
    //   // Check if nav is out if wp
    //   this.onToggleStyle(
    //     overviewNavOffSetTop,
    //     "overviewNavStyle",
    //     overviewNavStyleMedia,
    //     overviewNavPreStyle
    //   );
    //   this.onToggleStyle(
    //     overviewNavOffSetTop,
    //     "overviewNavListStyle",
    //     overviewNavListStyleMedia,
    //     overviewNavListStyle
    //   );
    // }
  };

  onSetBookForm = () => {
    // Check if bookform is out of wp then set style = fix or normal
    this.onChangeStyleByView(
      this.bookForm.current.bookForm.current.getBoundingClientRect().top - 111,
      "bookFormStyle",
      bookFormStyle,
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
      <div className="container">
        {/* Navbar */}
        <NavBar navStyle={NavBarStyles} navListStyle={NavBarListStyles} />
        {/* Sub nav */}
        <OverviewSubNav
          viewingContent={this.state.viewingContent.view}
          overviewNavStyle={this.state.overviewNavStyle}
          overviewNavListStyle={this.state.overviewNavListStyle}
          onScrollToSession={this.onScrollToSession}
        />
        {/* Header */}
        <Header heading={title} button={false}>
          {() => <HeaderImage active={true} imageUrl={headerImageUrl} />}
        </Header>
        {/* Content */}
        <div className="sub-container">
          {/* Overview  nav*/}
          <OverviewNav>
            <OverviewNavListItem
              value={0}
              onClick={this.onScrollToSession}
              title={"Overview"}
              active
            />
            <OverviewNavListItem
              onClick={this.onScrollToSession}
              value={1}
              title={"Guide"}
            />
            <OverviewNavListItem
              onClick={this.onScrollToSession}
              value={2}
              title={"Review"}
            />
            <OverviewNavListItem
              onClick={this.onScrollToSession}
              value={3}
              title={"Gallery"}
            />
          </OverviewNav>
          {/* Overview */}
          <Overview onRef={ref => (this.overview = ref)}>
            <OverviewContent
              ref={this.content}
              text={tripContent && tripContent.overview}
            />
            <OverviewGuide
              ref={this.guide}
              text={tripContent && tripContent.itinerary}
            />
            {/* Review and comments */}
            <OverviewReview ref={this.review} />
            <OverviewComment ref={this.comment} />
            {/* Gallery */}
            <Gallery images={gallery} ref={this.gallery} />
          </Overview>
          {/* Booking */}
          <Book ref={this.bookForm} style={this.state.bookFormStyle} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tripContent: state.tripContent
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
