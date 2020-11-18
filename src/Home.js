import React, { useState, useRef } from "react";
import { toJson } from 'unsplash-js'
import InfiniteScroll from "react-infinite-scroll-component";
import unsplash from './utils/unsplash';
import Card from './components/Card/index';
import './Home.css';

class Home extends React.Component {
  state = {
    photos: [],
    hasMore: true,
    page: 1,
    isLoading: false
  };

  fetchMoreData = () => {
    this.setState({
      isLoading: true
    });
    if (this.state.isLoading) return;
    unsplash.photos.listPhotos(this.state.page, 30, "latest")
      .then(toJson)
      .then(json => {
        this.setState({
          page: this.state.page + 1,
          photos: [...this.state.photos, ...json],
          hasMore: !!json.length,
          isLoading: false
        })
      });
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    unsplash.photos.listPhotos(this.state.page, 30, "latest")
      .then(toJson)
      .then(json => {
        this.setState({
          page: this.state.page + 1,
          photos: [...this.state.photos, ...json],
          hasMore: !!json.length,
          isLoading: false
        })
      });
  }

  render() {
    return (
      <div>
        <h1>Example: My Instagram</h1>
        <hr />

        <InfiniteScroll
          dataLength={this.state.photos.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.photos.map((photo, index) => (
            <div key={photo.id}>
              <Card>
                <img src={photo.urls.regular} alt="" />
              </Card>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Home;