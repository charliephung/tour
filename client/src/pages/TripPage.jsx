import React, { Component } from "react";
import PropTypes from "prop-types";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Overview from "../components/trippage/Overview";
import { Book } from "../components/trippage/Book";
import Gallery from "../components/trippage/Gallery";
import withFadeOnMount from "../HOComponent/fadeOnMount";

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
  render() {
    return (
      <div className="container">
        {/* Navbar */}
        <NavBar />
        {/* Header */}
        <header className="header">
          <h1 className="header__heading heading-1">Someware ADVENTURE</h1>
        </header>
        {/* Content */}
        <div className="sub-container">
          {/* Overview  nav*/}
          <section className="overview">
            <div className="overview__nav">
              <ul className="overview__list">
                <li className="overview__list-item active">Overview</li>
                <li className="overview__list-item">Guide</li>
                <li className="overview__list-item">Review</li>
                <li className="overview__list-item">Gallery</li>
              </ul>
            </div>
          </section>
          {/* Overview */}
          <Overview
            content={overviewText}
            guide={overviewText}
            rating={4}
            comments={comment}
            totalReviews={100}
          />
          {/* Booking */}
          <Book />

          {/* Gallery */}
          <Gallery images={gallery} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withFadeOnMount(TripPage);
