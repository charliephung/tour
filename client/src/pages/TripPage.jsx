import React, { Component } from "react";
import PropTypes from "prop-types";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Overview from "../components/trippage/Overview";
import { Book } from "../components/trippage/Book";
import Gallery from "../components/trippage/Gallery";
import withFadeOnMount from "../HOComponent/fadeOnMount";
import OverviewSubNav from "../components/trippage/OverviewSubNav";

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

const NavBarStyles = {
  position: "fixed",
  backgroundColor: "#fff",
  gridColumn: "1 / -1",
  display: "grid",
  width: "100%",
  zIndex: "1000",
  gridTemplateColumns: "repeat(8, 1fr)",
  borderBottom: "2px solid rgb(228, 229, 230)"
};

const NavBarListStyles = {
  gridColumn: "2 / span 6"
};
const overviewNavListStyle = {
  display: "flex",
  flex: "0 1 0%",
  gridColumn: "3 / span 4"
};
const overviewNavListStyleMedia = {
  display: "flex",
  flex: "0 1 0%",
  gridColumn: "1 / -1"
};
const overviewNavPreStyle = {
  gridTemplateColumns: "repeat(8, 1fr)",
  width: "100%",
  position: "fixed",
  top: "0",
  fontSize: "1.8rem",
  display: "grid",
  zIndex: "900",
  transition: "all .2s"
};
const overviewNavStyleMedia = {
  backgroundColor: "rgb(255, 255, 255)",
  gridTemplateColumns: "repeat(10, 1fr)",
  width: "100%",
  position: "fixed",
  top: "31px",
  fontSize: "1.8rem",
  display: "grid",
  zIndex: "900",
  transition: "all .2s",
  borderBottom: "2px solid rgb(228, 229, 230)"
};
const overviewNavStyle = {
  backgroundColor: "rgb(255, 255, 255)",
  gridTemplateColumns: "repeat(10, 1fr)",
  width: "100%",
  position: "fixed",
  top: "56px",
  fontSize: "1.8rem",
  display: "grid",
  zIndex: "900",
  transition: "all .2s",
  borderBottom: "2px solid rgb(228, 229, 230)"
};

const bookFormStyle = {
  position: "fixed",
  top: "110px",
  width: "312px",
  transition: "all .2s"
};

export class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewNavStyle: overviewNavPreStyle,
      overviewNavListStyle: overviewNavListStyle,
      bookFormStyle: overviewNavListStyle,
      viewingContent: {
        view: "overview"
      }
    };
    // this.overview = React.createRef();
    this.overviewNav = React.createRef();
    this.bookForm = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }
  onScroll = e => {
    let viewingContent = {
      ...this.overview.getPosition(),
      gallery: this.gallery.getPosition()
    };
    let positionArr = Object.values(viewingContent).map(ele => Math.abs(ele));
    let viewingContentPosition = positionArr.indexOf(Math.min(...positionArr));
    this.setState({
      viewingContent: {
        view: Object.keys(viewingContent)[viewingContentPosition]
      }
    });

    // Check if nav is out if wp
    this.overviewNav.current.getBoundingClientRect().top - 60 < 0 &&
      this.setState({
        // Style Overview navbar to fix
        overviewNavStyle: overviewNavStyle,
        overviewNavListStyle: overviewNavListStyle
      });
    this.overviewNav.current.getBoundingClientRect().top - 60 > 0 &&
      this.setState({
        // Style Overview navbar to normal
        overviewNavStyle: overviewNavPreStyle,
        overviewNavListStyle: overviewNavListStyle
      });
    // Check if bookform is out of wp then set style = fix or normal
    this.bookForm.current.bookForm.current.getBoundingClientRect().top - 111 <
      0 && this.setState({ bookFormStyle: bookFormStyle });
    this.bookForm.current.bookForm.current.getBoundingClientRect().top - 111 >
      0 && this.setState({ bookFormStyle: null });

    // Check if viewport width is lower than 1100
    if (
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <=
      1100
    ) {
      // Check if nav is out if wp
      this.overviewNav.current.getBoundingClientRect().top - 60 < 0 &&
        this.setState({
          overviewNavStyle: overviewNavStyleMedia,
          overviewNavListStyle: overviewNavListStyleMedia
        });
      this.overviewNav.current.getBoundingClientRect().top - 60 > 0 &&
        this.setState({
          overviewNavStyle: overviewNavPreStyle,
          overviewNavListStyle: overviewNavListStyle
        });
      this.setState({ bookFormStyle: null });
    }
  };

  render() {
    return (
      <div className="container">
        {/* Navbar */}
        <NavBar navStyle={NavBarStyles} navListStyle={NavBarListStyles} />
        {/* Sub nav */}
        <OverviewSubNav
          viewingContent={this.state.viewingContent.view}
          overviewNavStyle={this.state.overviewNavStyle}
          overviewNavListStyle={this.state.overviewNavListStyle}
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
                  className="overview__list-item 
                 active"
                >
                  Overview
                </li>
                <li className="overview__list-item">Guide</li>
                <li className="overview__list-item">Review</li>
                <li className="overview__list-item">Gallery</li>
              </ul>
            </div>
          </section>
          {/* Overview */}
          <Overview
            onRef={ref => (this.overview = ref)}
            // ref={this.overview}
            content={overviewText}
            guide={overviewText}
            rating={4}
            comments={comment}
            totalReviews={100}
          />
          {/* Booking */}

          <Book ref={this.bookForm} style={this.state.bookFormStyle} />

          {/* Gallery */}
          <Gallery images={gallery} onRef={ref => (this.gallery = ref)} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withFadeOnMount(TripPage);
