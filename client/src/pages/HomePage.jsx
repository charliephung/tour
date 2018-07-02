import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
// Component
import NavBar from "../components/navbar/NavBar";
import FeatureCard from "../components/homepage/FeatureCard";
import FeatureTrip from "../components/homepage/FeatureTrip";
import Footer from "../components/footer/Footer";
import HeaderImage from "../components/homepage/HeaderImage";
import "../HOComponent/fade.css";
import withFadeOnMout from "../HOComponent/fadeOnMount";
// Actions
import { actFetchTrip } from "../actions/trip";

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

// Trip
const tripContent = [
  {
    image:
      "https://lesrivesexperience.com/wp-content/uploads/2018/05/rowing-boat-in-Can-Gio-Forest-2.jpg",
    heading: "Can Gio Explore",
    fromPrice: "350",
    rating: "3.4",
    totalReviews: "1000"
  },
  {
    image:
      "https://media.audleytravel.com/-/media/images/home/southeast-asia/vietnam/places/istock_77224427_fishing_mekong_delta_800x2400.jpg?w=1800&q=80",
    heading: "Mekong Explore",
    fromPrice: "350",
    rating: "4.5",
    totalReviews: "1000"
  },
  {
    image: "https://cdn2.ivivu.com/2016/09/12/17/ivivu-tour-cu-chi-1n.gif",
    heading: "Cu Chi Tunnel",
    fromPrice: "350",
    rating: "5",
    totalReviews: "1000"
  },
  {
    image:
      "https://www.vietnamtravel.co/wp-content/uploads/2016/01/Dong-Nai-tourism-industry-gains-over-900-billion-VND1.jpg",
    heading: "Dong Nai Explore",
    fromPrice: "350",
    rating: "1.2",
    totalReviews: "1000"
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
      in: true
    };
  }

  onChangeLink = e => {
    this.setState({
      activeLink: e.target.value
    });
  };

  componentDidMount() {
    this.props.actFetchTrip();
    console.log(this.props);

    this.interval = setInterval(() => {
      this.setState({
        headerImage: (this.state.headerImage + 1) % 3,
        in: true
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTest = () => {
    this.setState({
      headerImage: (this.state.headerImage + 1) % 3,
      in: true
    });
  };

  render() {
    const myHeaderImage = headerImage.map((ele, index) => (
      <HeaderImage
        key={index}
        in={this.state.in}
        active={this.state.headerImage === index}
        imageUrl={ele.imageUrl}
      />
    ));

    return (
      <div className="container">
        {/* Nav */}
        <NavBar />
        {/* Header */}
        <header onClick={this.onTest} className="header">
          {myHeaderImage}
          <h1 className="header__heading heading-1">Experience in unknow</h1>
          <button className="btn">Experience trip</button>
        </header>
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
                  onClick={this.onChangeLink}
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
          {tripContent.map((ele, index) => (
            <FeatureTrip
              key={index}
              imageUrl={ele.image}
              heading={ele.heading}
              fromPrice={ele.fromPrice}
              rating={ele.rating}
              totalReviews={ele.totalReviews}
            />
          ))}
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips
});

const mapDispatchToProps = {
  actFetchTrip
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFadeOnMout
)(HomePage);
