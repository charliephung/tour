import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
// Component
import NavBar from "../components/navbar/NavBar";
import FeatureCard from "../components/homepage/FeatureCard";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeaderImage from "../components/homepage/HeaderImage";
import { Link } from "react-router-dom";
import "../HOComponent/fade.css";
import withFadeOnMout from "../HOComponent/fadeOnMount";
// Actions
import { actFetchTrip } from "../actions/trip";
import { actLoadingStart, actLoadingEnd } from "../actions/async";
// Ulti
import isEmpty from "../utils/isEmpty";

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
    actFetchTrip: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeLink: 0,
      headerImage: 0,
      LZfeatureTrips: null,
      LZNotFound: null,
      trips: null
    };
  }

  onChangeFeatureTrip = e => {
    this.onChangeLink(e);
    // Check if trips are already fetched
    const index = this.state.trips.findIndex(
      ele => ele.location === lookupLocation[e.target.value]
    );
    // fetched data when not found
    index === -1 && this.props.actFetchTrip(lookupLocation[e.target.value]);
  };

  onChangeLink = e => {
    const { value } = e.target;
    this.setState(state => {
      if (state.activeLink !== value) {
        return { activeLink: value };
      }
    });
  };

  async shouldComponentUpdate(nextProps) {
    // Check if cmp should update
    if (this.state.trips !== nextProps.trips) {
      if (this.state.LZfeatureTrips === null) {
        // Load feature trip cmp when need
        const {
          default: FeatureTrip
        } = await import("../components/homepage/FeatureTrip");
        const {
          default: FeatureTripNotFound
        } = await import("../components/homepage/FeatureTripNotFound");
        this.setState({
          LZfeatureTrips: FeatureTrip,
          trips: nextProps.trips,
          LZNotFound: FeatureTripNotFound
        });
      } else this.setState({ trips: nextProps.trips });
    }
    return false;
  }

  componentDidMount() {
    // Fetch init data
    this.props.actFetchTrip("sai gon");
  }

  renderNotFoundCard = loading => {
    const { LZNotFound } = this.state;
    return (
      <React.Fragment>
        <LZNotFound />
        <LZNotFound />
        <LZNotFound />
        <LZNotFound />
      </React.Fragment>
    );
  };

  render() {
    let featureTripContent = null;
    // Check to see trips in active link is loaded
    if (!isEmpty(this.state.trips)) {
      const { activeLink, trips, LZfeatureTrips } = this.state;
      if (!trips[activeLink]) {
        // If trips has not loaded set loading card
        featureTripContent = this.renderNotFoundCard({ loading: true });
      } else {
        if (trips[activeLink].trips.length === 0) {
          // If has 0 trips set comming soon card

          featureTripContent = this.renderNotFoundCard({ loading: false });
        } else {
          // Populate the trips in the active link
          featureTripContent = trips[activeLink].trips.map((ele, index) => (
            <Link key={index} to={"trip/" + ele.title + "/" + ele._id}>
              <LZfeatureTrips
                headerImageUrl={ele.headerImageUrl}
                title={ele.title}
                pricePerDay={ele.pricePerDay}
                pricePerPerson={ele.pricePerPerson}
                rating={ele.rating}
                reviews={ele.reviews}
              />
            </Link>
          ));
        }
      }
    }

    return (
      <div className="container">
        {/* Nav */}
        <NavBar />
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
          {featureTripContent}
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
  loading: state.loading
});

const mapDispatchToProps = {
  actFetchTrip,
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
