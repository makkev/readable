import React, { Component } from 'react';
import * as PostsAPI from '../PostsAPI';

class PostsList extends Component {

  state = {
    posts: [],
  };

  componentDidMount() {
    PostsAPI.getAll().then((posts) => {
      this.setState({ posts });
    });
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        Posts List
      </div>
    );
  }
}

export default PostsList;